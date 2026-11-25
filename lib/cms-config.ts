import fs from 'fs';
import path from 'path';
import { blobPut, blobReadText, isBlobConfigured } from '@/lib/blob-store';

// CMS content is stored in Vercel Blob when configured, otherwise in a local
// JSON file during development. The previous in-memory store lost every edit
// on redeploy and across serverless instances.
export interface HeroConfig {
  id: string;
  page: 'home' | 'about' | 'collection';
  headline: string;
  eyebrow?: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref: string;
  videoUrl?: string;
  posterUrl?: string;
  textTone: 'light' | 'dark';
  alignment: 'left' | 'center' | 'right';
  headlineFont?: string;
  customFontUrl?: string;
  headlineColor?: string;
  subheadlineColor?: string;
  panelColor?: string;
  isActive: boolean;
}

export interface NavConfig {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  contact: string;
  email: string;
  message: string;
  source: string;
  createdAt: string;
}

export interface SiteConfig {
  brandName: string;
  brandNameSecondary: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  logoText: string;
  showBag: boolean;
  ghostNavEnabled: boolean;
}

interface CMSData {
  heroes: HeroConfig[];
  nav: NavConfig[];
  inquiries: Inquiry[];
  siteConfig: SiteConfig;
}

const BLOB_PATH = 'cms-data.json';
const LOCAL_FILE = path.join(process.cwd(), '.data', 'cms.json');

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const defaultHeroes: HeroConfig[] = [
  {
    id: 'home-hero',
    page: 'home',
    headline: 'The African Luxury Edit',
    eyebrow: 'DA-VELA / HOUSE OF ARTS',
    subheadline: 'Heritage reimagined. Craft with purpose.',
    ctaLabel: 'Visit Store',
    ctaHref: '/collections/new-arrivals',
    videoUrl: '',
    posterUrl: '/uploads/pics/women.JPG',
    textTone: 'dark',
    alignment: 'left',
    headlineFont: 'cormorant',
    customFontUrl: '',
    headlineColor: '#0d0d0d',
    subheadlineColor: '#1a1a1a',
    panelColor: '#f5f3ef',
    isActive: true,
  },
];

const defaultNav: NavConfig[] = [
  { id: '1', label: 'Women', href: '/collections/women', order: 1, visible: true },
  { id: '2', label: 'Men', href: '/collections/men', order: 2, visible: true },
  { id: '3', label: 'Gallery Collection', href: '/gallery', order: 3, visible: true },
  { id: '4', label: 'New in', href: '/collections/new-arrivals', order: 4, visible: true },
  { id: '5', label: 'Contact', href: '/contact', order: 5, visible: true },
];

const defaultSiteConfig: SiteConfig = {
  brandName: 'DA-VELA FASHIONS',
  brandNameSecondary: 'DA-VELA HOUSE OF ARTS',
  tagline: 'African Luxury Redefined',
  phone: '0765866555',
  whatsapp: '0765866555',
  email: 'novaratechafrica@gmail.com',
  location: 'Kampala, Uganda',
  logoText: 'DA-VELA FASHIONS',
  showBag: true,
  ghostNavEnabled: true,
};

const defaults = (): CMSData => ({
  heroes: clone(defaultHeroes),
  nav: clone(defaultNav),
  inquiries: [],
  siteConfig: clone(defaultSiteConfig),
});

let cached: CMSData | null = null;

function parse(raw: string | null): CMSData {
  if (!raw) return defaults();
  try {
    const saved = JSON.parse(raw) as Partial<CMSData>;
    const base = defaults();
    return {
      heroes: Array.isArray(saved.heroes) ? saved.heroes : base.heroes,
      nav: Array.isArray(saved.nav) ? saved.nav : base.nav,
      inquiries: Array.isArray(saved.inquiries) ? saved.inquiries : base.inquiries,
      siteConfig: { ...base.siteConfig, ...(saved.siteConfig ?? {}) },
    };
  } catch {
    return defaults();
  }
}

async function load(): Promise<CMSData> {
  if (isBlobConfigured()) {
    return parse(await blobReadText(BLOB_PATH));
  }

  if (cached) return cached;
  if (!process.env.VERCEL) {
    try {
      cached = parse(fs.readFileSync(LOCAL_FILE, 'utf8'));
      return cached;
    } catch {
      cached = defaults();
      return cached;
    }
  }

  cached = defaults();
  return cached;
}

async function persist(data: CMSData, strict = true): Promise<void> {
  cached = data;
  const raw = JSON.stringify(data, null, 2);

  if (isBlobConfigured()) {
    await blobPut(BLOB_PATH, raw, 'application/json');
    return;
  }

  if (process.env.VERCEL) {
    if (strict) {
      throw new Error(
        'CMS storage is not configured. Create a public Vercel Blob store and add BLOB_READ_WRITE_TOKEN to the project, then redeploy.',
      );
    }
    return;
  }

  fs.mkdirSync(path.dirname(LOCAL_FILE), { recursive: true });
  fs.writeFileSync(LOCAL_FILE, raw, 'utf8');
}

class CMSStore {
  private static instance: CMSStore;

  static getInstance(): CMSStore {
    if (!CMSStore.instance) CMSStore.instance = new CMSStore();
    return CMSStore.instance;
  }

  async getHero(page: string): Promise<HeroConfig | null> {
    const data = await load();
    return data.heroes.find((hero) => hero.page === page && hero.isActive) ?? null;
  }

  async getAllHeroes(): Promise<HeroConfig[]> {
    return (await load()).heroes;
  }

  async updateHero(hero: HeroConfig): Promise<void> {
    const data = await load();
    const index = data.heroes.findIndex((item) => item.id === hero.id);
    if (index >= 0) data.heroes[index] = { ...hero };
    else data.heroes.push({ ...hero });
    await persist(data);
  }

  async getNav(): Promise<NavConfig[]> {
    return (await load()).nav
      .filter((item) => item.visible)
      .sort((a, b) => a.order - b.order);
  }

  async getAllNav(): Promise<NavConfig[]> {
    return (await load()).nav.sort((a, b) => a.order - b.order);
  }

  async updateNav(items: NavConfig[]): Promise<void> {
    const data = await load();
    data.nav = items;
    await persist(data);
  }

  async addInquiry(input: Omit<Inquiry, 'id' | 'createdAt'>): Promise<Inquiry> {
    const data = await load();
    const inquiry: Inquiry = {
      ...input,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };
    data.inquiries = [inquiry, ...data.inquiries].slice(0, 100);
    await persist(data, false);
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return (await load()).inquiries;
  }

  async getSiteConfig(): Promise<SiteConfig> {
    return (await load()).siteConfig;
  }

  async updateSiteConfig(config: Partial<SiteConfig>): Promise<SiteConfig> {
    const data = await load();
    data.siteConfig = { ...data.siteConfig, ...config };
    await persist(data);
    return data.siteConfig;
  }
}

export const cmsStore = CMSStore.getInstance();

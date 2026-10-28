// CMS Configuration - All content editable from admin panel
export interface HeroConfig {
  id: string;
  page: 'home' | 'about' | 'collection';
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref: string;
  videoUrl?: string;
  posterUrl?: string;
  textTone: 'light' | 'dark';
  alignment: 'left' | 'center' | 'right';
  isActive: boolean;
}

export interface NavConfig {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
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

class CMSStore {
  private static instance: CMSStore;
  private heroConfigs: HeroConfig[] = [
    {
      id: 'home-hero',
      page: 'home',
      headline: 'The African Luxury Edit',
      subheadline: 'Heritage reimagined. Craft with purpose.',
      ctaLabel: 'Visit Store',
      ctaHref: '/collections/new-arrivals',
      videoUrl: '',
      posterUrl: '',
      textTone: 'dark',
      alignment: 'left',
      isActive: true,
    },
  ];
  private navConfigs: NavConfig[] = [
    { id: '1', label: 'Women', href: '/collections/women', order: 1, visible: true },
    { id: '2', label: 'Men', href: '/collections/men', order: 2, visible: true },
    { id: '3', label: 'Gallery Collection', href: '/gallery', order: 3, visible: true },
    { id: '4', label: 'New in', href: '/collections/new-arrivals', order: 4, visible: true },
  ];
  private siteConfig: SiteConfig = {
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

  static getInstance() {
    if (!CMSStore.instance) {
      CMSStore.instance = new CMSStore();
    }
    return CMSStore.instance;
  }

  getHero(page: string): HeroConfig | null {
    return this.heroConfigs.find((h) => h.page === page && h.isActive) || null;
  }

  getAllHeroes(): HeroConfig[] {
    return this.heroConfigs;
  }

  updateHero(hero: HeroConfig) {
    const index = this.heroConfigs.findIndex((h) => h.id === hero.id);
    if (index >= 0) {
      this.heroConfigs[index] = hero;
    } else {
      this.heroConfigs.push(hero);
    }
  }

  getNav(): NavConfig[] {
    return this.navConfigs.filter((n) => n.visible).sort((a, b) => a.order - b.order);
  }

  getAllNav(): NavConfig[] {
    return this.navConfigs.sort((a, b) => a.order - b.order);
  }

  updateNav(navItems: NavConfig[]) {
    this.navConfigs = navItems;
  }

  getSiteConfig(): SiteConfig {
    return this.siteConfig;
  }

  updateSiteConfig(config: Partial<SiteConfig>) {
    this.siteConfig = { ...this.siteConfig, ...config };
  }
}

export const cmsStore = CMSStore.getInstance();

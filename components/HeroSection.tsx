import { HeroVideo } from '@/components/HeroVideo';
import { getCampaignHero } from '@/lib/fashions-api';
import { cmsStore } from '@/lib/cms-config';

export async function HeroSection({ slug }: { slug: string }) {
  // Try CMS first, fallback to existing API
  const cmsHero = cmsStore.getHero(slug);
  if (cmsHero) {
    const hero = {
      slug: cmsHero.page,
      headline: cmsHero.headline,
      subheadline: cmsHero.subheadline,
      ctaLabel: cmsHero.ctaLabel,
      ctaHref: cmsHero.ctaHref,
      posterUrl: cmsHero.posterUrl || '',
      videoUrl: cmsHero.videoUrl,
      textTone: cmsHero.textTone,
      alignment: cmsHero.alignment,
    };
    return hero ? <HeroVideo hero={hero} /> : null;
  }
  
  const hero = await getCampaignHero(slug);
  return hero ? <HeroVideo hero={hero} /> : null;
}

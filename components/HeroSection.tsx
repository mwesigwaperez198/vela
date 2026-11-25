import { HeroVideo } from '@/components/HeroVideo';
import { getCampaignHero } from '@/lib/fashions-api';
import { cmsStore } from '@/lib/cms-config';

export async function HeroSection({ slug }: { slug: string }) {
  const cmsHero = await cmsStore.getHero(slug);
  if (cmsHero) {
    return (
      <HeroVideo
        hero={{
          slug: cmsHero.page,
          headline: cmsHero.headline,
          eyebrow: cmsHero.eyebrow,
          subheadline: cmsHero.subheadline,
          ctaLabel: cmsHero.ctaLabel,
          ctaHref: cmsHero.ctaHref,
          posterUrl: cmsHero.posterUrl || '',
          videoUrl: cmsHero.videoUrl,
          textTone: cmsHero.textTone,
          alignment: cmsHero.alignment,
          headlineFont: cmsHero.headlineFont,
          customFontUrl: cmsHero.customFontUrl,
          headlineColor: cmsHero.headlineColor,
          subheadlineColor: cmsHero.subheadlineColor,
          panelColor: cmsHero.panelColor,
        }}
      />
    );
  }

  const hero = await getCampaignHero(slug);
  return hero ? <HeroVideo hero={hero} /> : null;
}

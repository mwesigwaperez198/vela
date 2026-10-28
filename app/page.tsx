import { Suspense } from 'react';
import Link from 'next/link';
import { CollectionGrid } from '@/components/CollectionGrid';
import { HeroSection } from '@/components/HeroSection';
import { HeroSkeleton, ProductGridSkeleton } from '@/components/Skeletons';

export const revalidate = 60;

export default function HomePage() {
  const featured = process.env.FEATURED_COLLECTION_SLUG ?? 'new-arrivals';

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection slug="home" />
      </Suspense>

      <section className="px-4 py-24 lg:px-10 lg:py-36">
        <div className="mb-14 flex items-end justify-between lg:mb-20">
          <h2 className="font-serif text-4xl md:text-6xl">New arrivals</h2>
          <Link
            href={`/collections/${featured}`}
            className="border-b border-luxuryBlack pb-1 text-[11px] font-extralight tracking-editorial uppercase hover:opacity-60 transition-opacity"
          >
            Visit Store
          </Link>
        </div>
        <Suspense fallback={<ProductGridSkeleton />}>
          <CollectionGrid slug={featured} limit={8} />
        </Suspense>
      </section>
    </>
  );
}

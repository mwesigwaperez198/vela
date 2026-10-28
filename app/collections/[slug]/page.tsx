import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CollectionGrid } from '@/components/CollectionGrid';
import { ProductGridSkeleton } from '@/components/Skeletons';
import { titleFromSlug } from '@/lib/format';

export const revalidate = 60;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return { title: titleFromSlug(slug) };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;

  return (
    <section className="px-4 pb-24 pt-36 lg:px-10 lg:pb-36 lg:pt-48">
      <h1 className="mb-16 font-serif text-5xl md:text-7xl lg:mb-24">{titleFromSlug(slug)}</h1>
      <Suspense fallback={<ProductGridSkeleton />}>
        <CollectionGrid slug={slug} />
      </Suspense>
    </section>
  );
}

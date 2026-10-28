import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { AddToCart } from '@/components/AddToCart';
import { getProductByHandle } from '@/lib/fashions-api';
import { formatUGX } from '@/lib/format';

export const revalidate = 60;

type Params = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  return { title: product?.title ?? 'Product', description: product?.description };
}

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  return (
    <article className="grid gap-10 px-4 pb-24 pt-28 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pt-32">
      <div className="space-y-4 lg:col-span-7">
        <div className="relative aspect-[3/4] bg-neutral-100">
          {product.editorialImage && (
            <Image
              src={product.editorialImage}
              alt={product.editorialImageAlt ?? product.title}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        {product.campaignVideoUrl && (
          <video
            className="aspect-[3/4] w-full bg-neutral-100 object-cover"
            src={product.campaignVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
          />
        )}
      </div>

      <div className="lg:col-span-5">
        <div className="space-y-8 lg:sticky lg:top-32">
          <header className="space-y-3">
            <h1 className="font-serif text-4xl md:text-5xl">{product.title}</h1>
            <p className="text-sm tracking-wider">{formatUGX(product.priceUGX)}</p>
          </header>
          <p className="max-w-md font-serif text-lg leading-relaxed text-neutral-700">{product.description}</p>
          <AddToCart product={product} />
        </div>
      </div>
    </article>
  );
}

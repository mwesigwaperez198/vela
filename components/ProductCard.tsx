import Image from 'next/image';
import Link from 'next/link';
import { formatUGX } from '@/lib/format';
import type { UnifiedProduct } from '@/lib/types';

export function ProductCard({ product, priority = false }: { product: UnifiedProduct; priority?: boolean }) {
  const soldOut = product.inventoryCount === 0;

  return (
    <article className="product-card">
      <Link href={`/products/${product.handle}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {product.editorialImage && (
            <Image
              src={product.editorialImage}
              alt={product.editorialImageAlt ?? product.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              priority={priority}
              className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.03]"
            />
          )}
          {soldOut && (
            <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[10px] tracking-editorial uppercase">
              Sold out
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1.5">
          <h3 className="text-[11px] font-light tracking-editorial uppercase">{product.title}</h3>
          <p className="text-[11px] font-light tracking-wider text-neutral-500">
            {formatUGX(product.priceUGX)}
          </p>
        </div>
      </Link>
    </article>
  );
}

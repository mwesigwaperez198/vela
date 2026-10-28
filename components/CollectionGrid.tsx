import { ProductCard } from '@/components/ProductCard';
import { getEditorialCollection } from '@/lib/fashions-api';

export async function CollectionGrid({ slug, limit }: { slug: string; limit?: number }) {
  const products = await getEditorialCollection(slug);
  const visible = limit ? products.slice(0, limit) : products;

  if (visible.length === 0) {
    return <p className="py-24 text-sm tracking-wider text-neutral-500">No pieces in this collection yet.</p>;
  }

  return (
    <div className="editorial-grid">
      {visible.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 2} />
      ))}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartProvider';
import type { UnifiedProduct } from '@/lib/types';

export function AddToCart({ product }: { product: UnifiedProduct }) {
  const { add, open } = useCart();
  const [variantId, setVariantId] = useState<string | null>(
    product.variants.length === 1 ? (product.variants[0]?.id ?? null) : null,
  );
  const [needsSize, setNeedsSize] = useState(false);

  const selected = product.variants.find((v) => v.id === variantId);
  const soldOut = product.inventoryCount === 0;

  function handleAdd() {
    if (!selected) {
      setNeedsSize(true);
      return;
    }
    add({
      variantId: selected.id,
      handle: product.handle,
      title: product.title,
      size: selected.size,
      image: product.editorialImage,
      unitPriceUGX: selected.priceUGX,
      quantity: 1,
    });
    open();
  }

  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="mb-3 text-[11px] tracking-editorial uppercase">Size</legend>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              disabled={!v.available}
              aria-pressed={v.id === variantId}
              onClick={() => {
                setVariantId(v.id);
                setNeedsSize(false);
              }}
              className={`min-w-14 border px-4 py-3 text-[11px] tracking-wider transition-colors duration-300 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:line-through ${
                v.id === variantId
                  ? 'border-luxuryBlack bg-luxuryBlack text-white'
                  : 'border-neutral-300 hover:border-luxuryBlack'
              }`}
            >
              {v.size}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="mt-3 min-h-4 text-xs text-neutral-500">
          {needsSize ? 'Select a size to add this piece.' : selected?.fabric ? `Fabric: ${selected.fabric}` : ''}
        </p>
      </fieldset>

      <button
        type="button"
        onClick={handleAdd}
        disabled={soldOut}
        className="w-full bg-luxuryBlack py-4 text-[11px] font-light tracking-extra-wide text-white uppercase transition-opacity hover:opacity-85 disabled:bg-neutral-300"
      >
        {soldOut ? 'Sold out' : 'Add to bag'}
      </button>
    </div>
  );
}

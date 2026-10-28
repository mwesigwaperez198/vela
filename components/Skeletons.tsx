export function HeroSkeleton() {
  return <div aria-hidden className="h-[100svh] w-full animate-pulse bg-neutral-200" />;
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div aria-hidden className="editorial-grid">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="product-card animate-pulse">
          <div className="aspect-[3/4] bg-neutral-100" />
          <div className="mt-4 h-2.5 w-2/3 bg-neutral-100" />
          <div className="mt-2 h-2.5 w-1/3 bg-neutral-100" />
        </div>
      ))}
    </div>
  );
}

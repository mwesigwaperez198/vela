import { ProductGridSkeleton } from '@/components/Skeletons';

export default function Loading() {
  return (
    <section className="px-4 pb-24 pt-36 lg:px-10 lg:pt-48">
      <div className="mb-16 h-14 w-64 animate-pulse bg-neutral-100 lg:mb-24" />
      <ProductGridSkeleton />
    </section>
  );
}

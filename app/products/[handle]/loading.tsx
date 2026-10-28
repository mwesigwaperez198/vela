export default function Loading() {
  return (
    <div aria-hidden className="grid gap-10 px-4 pt-28 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pt-32">
      <div className="aspect-[3/4] animate-pulse bg-neutral-100 lg:col-span-7" />
      <div className="space-y-6 lg:col-span-5">
        <div className="h-10 w-3/4 animate-pulse bg-neutral-100" />
        <div className="h-4 w-1/4 animate-pulse bg-neutral-100" />
        <div className="h-24 animate-pulse bg-neutral-100" />
      </div>
    </div>
  );
}

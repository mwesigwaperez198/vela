const ugx = new Intl.NumberFormat('en-UG', {
  style: 'currency',
  currency: 'UGX',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** UGX has no minor unit in everyday use, so amounts are whole shillings. */
export const formatUGX = (amount: number): string => ugx.format(amount);

export const titleFromSlug = (slug: string): string =>
  slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

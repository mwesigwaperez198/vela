export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

export function cmsConfigured(): boolean {
  return Boolean(
    process.env.VISUAL_CMS_URL &&
      process.env.VISUAL_CMS_TOKEN &&
      process.env.COMMERCE_CMS_URL &&
      process.env.COMMERCE_STOREFRONT_TOKEN,
  );
}

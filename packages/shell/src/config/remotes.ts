
// Конфигурация с версионированием
export const remotesConfig = {
  catalog: {
    // Можно использовать конкретную версию или latest
    entry: getRemoteUrl('catalog', process.env.CATALOG_VERSION || 'latest'),
    // Fallback на предыдущую версию при ошибке
    fallback: getRemoteUrl('catalog', process.env.CATALOG_FALLBACK || 'stable'),
  },
  cart: {
    entry: getRemoteUrl('cart', process.env.CART_VERSION || 'latest'),
    fallback: getRemoteUrl('cart', process.env.CART_FALLBACK || 'stable'),
  },
};

function getRemoteUrl(name: string, version: string): string {
  const baseUrl = process.env.CDN_BASE_URL || 'https://cdn.example.com';
  return `${baseUrl}/\${name}/\${version}/remoteEntry.js`;
}

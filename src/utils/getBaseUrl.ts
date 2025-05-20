export function getBaseUrl() {
  return process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.BASE_URL;
}

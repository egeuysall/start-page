export const isValidUrl = (input: string): boolean => {
  if (input.match(/^localhost(:\d+)?/i)) return true;
  if (input.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?/)) return true;

  const domainPattern = /^([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/.*)?$/i;
  if (domainPattern.test(input)) return true;

  try {
    const url = new URL(input.startsWith("http") ? input : `https://${input}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
};

export const normalizeUrl = (input: string): string => {
  if (input.startsWith("http://") || input.startsWith("https://")) {
    return input;
  }
  return `https://${input}`;
};

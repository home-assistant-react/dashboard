/**
 * Validates whether a given string is a valid URL.
 * @param url - The URL string to validate.
 * @param requireProtocol - Indicates whether a protocol is required (default: true).
 * @returns True if the URL is valid, otherwise false.
 */
export function isValidUrl(url: string, requireProtocol = true): boolean {
  try {
    // If a protocol is required, use new URL to validate directly.
    if (requireProtocol) {
      new URL(url);
      return true;
    }

    // If protocol is not required, prepend a default protocol and validate.
    const testUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : "http://" + url;
    new URL(testUrl);
    return true;
  } catch (error) {
    // If any error occurs during URL validation, return false.
    return false;
  }
}

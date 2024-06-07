type PopupOptions = {
  width?: number;
  height?: number;
  resizable?: boolean;
  scrollbars?: boolean;
  toolbar?: boolean;
};

/**
 * Opens a popup window with specified options for size and features.
 *
 * @param url - The URL to open in the popup window.
 * @param options - Optional settings for the popup window, including width, height, resizable, scrollbars, and toolbar.
 * @returns A reference to the newly opened window.
 *
 * @example
 * // Example usage:
 * const popupOptions = {
 *   width: 600,
 *   height: 400,
 *   resizable: true,
 *   scrollbars: true,
 *   toolbar: false
 * };
 * const popup = openPopup("https://example.com", popupOptions);
 * if (popup) {
 *   console.log("Popup opened successfully");
 * }
 */
export const openPopup = (url: string, options: PopupOptions = {}) => {
  const defaultWidth = 500;
  const defaultHeight = 500;

  // Determine window size and screen position
  const width = options.width || defaultWidth;
  const height = options.height || defaultHeight;
  const left = window.innerWidth / 2 - width / 2 + window.screenX;
  const top = window.innerHeight / 2 - height / 2 + window.screenY;

  // Set popup features
  const resizable = options.resizable ? "yes" : "no";
  const scrollbars = options.scrollbars ? "yes" : "no";
  const toolbar = options.toolbar ? "yes" : "no";

  const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable=${resizable},scrollbars=${scrollbars},toolbar=${toolbar}`;

  return window.open(url, "_blank", windowFeatures);
};

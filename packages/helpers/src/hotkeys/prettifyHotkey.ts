const keyMap: Record<string, string> = {
  ctrl: "⌃", // Control icon
  shift: "⇧", // Shift icon
  alt: "⎇", // Alt icon
  cmd: "⌘", // Command icon (for macOS)
  win: "⊞", // Windows icon (for Windows)
};

/**
 * Determines the appropriate meta key for the current operating system.
 * This function checks the user's platform or user agent string to identify if the operating system is macOS.
 * It returns "cmd" for macOS and "ctrl" for other systems, allowing for platform-specific key mappings in applications.
 *
 * @returns A string representing the meta key for the current operating system: "cmd" for macOS, "ctrl" for others.
 *
 * @example
 * // Example usage:
 * const metaKey = getMetaKeyForOS();
 * console.log(metaKey); // Outputs "cmd" if on macOS, otherwise "ctrl".
 */
function getMetaKeyForOS(): string {
  const platform =
    navigator?.userAgent?.toLowerCase() ||
    navigator?.platform?.toLowerCase() ||
    "";
  if (platform.includes("mac")) {
    return "cmd"; // Use Command key on macOS
  } else {
    return "ctrl"; // Default to Control key on other systems
  }
}

/**
 * Converts a keyboard shortcut string into a more readable format, replacing certain key names
 * with platform-specific names and icons. This is useful for displaying keyboard shortcuts
 * in a user-friendly way in application interfaces.
 *
 * @param shortcut - The keyboard shortcut string, with keys separated by a plus sign (e.g., "ctrl+shift+meta").
 * @returns A prettified string representing the keyboard shortcut with platform-specific replacements and formatting.
 *
 * @example
 * // Example usage:
 * const formattedShortcut = prettifyHotkey("ctrl+shift+meta");
 * console.log(formattedShortcut); // Outputs the prettified shortcut based on the OS, e.g., "Ctrl+Shift+Cmd" on macOS.
 */
export function prettifyHotkey(shortcut: string): string {
  const keys = shortcut.split("+"); // Split the input into individual keys
  const metaKey = getMetaKeyForOS(); // Get the correct meta key based on OS

  // Replace 'meta' with the correct key (cmd or ctrl) based on OS
  const formattedKeys = keys.map((key) => {
    if (key === "meta") {
      return keyMap[metaKey];
    } else if (keyMap[key]) {
      return keyMap[key]; // Replace with corresponding icon
    } else {
      return key.toUpperCase(); // Default to uppercase for regular keys
    }
  });

  // Join the formatted keys with a more readable delimiter
  return formattedKeys.join(""); // Output with a space and plus sign
}

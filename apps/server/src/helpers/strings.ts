export const sanitizeId = (id: string): string => {
  return id.replace(/[^a-zA-Z0-9-]/g, "");
};

export function isValidAuthToken(s: string): boolean {
  /*
    Validates the string based on the following criteria:
    1. Contains only letters (case-insensitive), numbers, and the symbols: _ . $ -
    2. Length is between 3 and 120 characters inclusive.
    */
  const regex = /^[a-zA-Z0-9_.$-]*$/;
  return s.length >= 3 && s.length <= 120 && regex.test(s);
}

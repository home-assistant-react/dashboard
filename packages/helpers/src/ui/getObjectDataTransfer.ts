/**
 * Extracts and parses JSON data from a DataTransfer object.
 *
 * @param dataTransfer - The DataTransfer object containing the data.
 * @returns The parsed object if the data is valid JSON, or null if the data is not available or parsing fails.
 *
 * @template T - The type of the object to be returned after parsing the JSON data.
 *
 * @example
 * // Example usage:
 * const handleDrop = (event) => {
 *   const data = getObjectDataTransfer<MyType>(event.dataTransfer);
 *   if (data) {
 *     console.log(data); // Outputs the parsed object
 *   } else {
 *     console.log("Invalid or no data found");
 *   }
 * };
 */
export const getObjectDataTransfer = <T>(dataTransfer: DataTransfer | null) => {
  if (!dataTransfer) return null;

  try {
    return JSON.parse(dataTransfer.getData("text/plain")) as T;
  } catch (e) {
    return null;
  }
};

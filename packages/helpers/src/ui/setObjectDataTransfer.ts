/**
 * Sets an object as the data in a DataTransfer object by converting it to a JSON string.
 *
 * @param dataTransfer - The DataTransfer object where the data will be set.
 * @param object - The object to be set as data in the DataTransfer object.
 *
 * @template T - The type of the object to be set in the DataTransfer.
 *
 * @example
 * // Example usage:
 * const dataTransfer = new DataTransfer();
 * const myObject = { key: "value" };
 * setObjectDataTransfer(dataTransfer, myObject);
 * // The dataTransfer object now contains the JSON string representation of `myObject`.
 */
export const setObjectDataTransfer = <T>(
  dataTransfer: DataTransfer,
  object: T,
) => {
  dataTransfer.setData("text/plain", JSON.stringify(object || null));
};

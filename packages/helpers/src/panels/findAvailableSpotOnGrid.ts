import { PanelsGroup } from "@home-assistant-react/types/src";
import { DEFAULT_GRID_COLS } from "@home-assistant-react/defines/src";
type GridObject = { w: number; h: number; x: number; y: number };

/**
 * Finds an available spot on a grid for a new object, ensuring it does not overlap with existing objects.
 *
 * @param gridObjects - An array of existing grid objects with their positions and dimensions.
 * @param newObj - The new object with specified width and height to be placed on the grid.
 * @param columns - The number of columns in the grid. Default is `DEFAULT_GRID_COLS`.
 * @returns An object representing the position (x, y) and dimensions (w, h) of the new object on the grid.
 *
 * @example
 * // Example usage:
 * const existingObjects: PanelsGroup[] = [
 *   { w: 2, h: 2, x: 0, y: 0, panels: [] },
 *   { w: 2, h: 2, x: 2, y: 0, panels: [] }
 * ];
 * const newObject = { w: 1, h: 1 };
 * const availableSpot = findAvailableSpotOnGrid(existingObjects, newObject);
 * console.log(availableSpot); // Outputs: { w: 1, h: 1, x: 0, y: 2 }
 */
export const findAvailableSpotOnGrid = (
  gridObjects: PanelsGroup[],
  newObj: { w: number; h: number },
  columns = DEFAULT_GRID_COLS,
) => {
  const doesOverlap = (a: GridObject, b: GridObject): boolean => {
    return (
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
    );
  };

  for (let y = 0; ; y++) {
    for (let x = 0; x <= columns - newObj.w; x++) {
      const potentialSpot: GridObject = { ...newObj, x, y };
      let hasOverlap = false;

      for (const obj of gridObjects) {
        if (doesOverlap(potentialSpot, obj)) {
          hasOverlap = true;
          break;
        }
      }

      if (!hasOverlap) {
        return potentialSpot;
      }
    }
  }
};

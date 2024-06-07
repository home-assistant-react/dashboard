import { VisibilityStrategy } from "@home-assistant-react/types/src";
import { isVisible } from "./isVisible";

/**
 * Determines the visibility of an element on a modal based on the provided visibility strategy.
 * This function uses the `isVisible` function to check if the element should be visible specifically in a modal context.
 *
 * @param selected - The selected visibility strategy to compare against.
 * @param visibleByDefault - Whether the element should be visible if no selected strategy is provided. Default is false.
 * @returns A boolean indicating whether the element should be visible on a modal.
 *
 * @example
 * // Example usage:
 * const isElementVisibleOnModal = isVisibleOnModal(VisibilityStrategy.ModalOnly);
 * console.log(isElementVisibleOnModal); // Outputs: true
 *
 * const isElementHiddenOnModal = isVisibleOnModal(VisibilityStrategy.Never);
 * console.log(isElementHiddenOnModal); // Outputs: false
 */
export const isVisibleOnModal = (
  selected?: VisibilityStrategy,
  visibleByDefault = false,
) => {
  return isVisible(VisibilityStrategy.ModalOnly, selected, visibleByDefault);
};

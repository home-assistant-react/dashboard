import { VisibilityStrategy } from "@home-assistant-react/types/src";
import { isVisible } from "./isVisible";

/**
 * Determines the visibility of an element on a card based on the provided visibility strategy.
 * This function uses the `isVisible` function to check if the element should be visible specifically in a card context.
 *
 * @param selected - The selected visibility strategy to compare against.
 * @param visibleByDefault - Whether the element should be visible if no selected strategy is provided. Default is false.
 * @returns A boolean indicating whether the element should be visible on a card.
 *
 * @example
 * // Example usage:
 * const isElementVisibleOnCard = isVisibleOnCard(VisibilityStrategy.CardOnly);
 * console.log(isElementVisibleOnCard); // Outputs: true
 *
 * const isElementHiddenOnCard = isVisibleOnCard(VisibilityStrategy.Never);
 * console.log(isElementHiddenOnCard); // Outputs: false
 */
export const isVisibleOnCard = (
  selected?: VisibilityStrategy,
  visibleByDefault = false,
) => {
  return isVisible(VisibilityStrategy.CardOnly, selected, visibleByDefault);
};

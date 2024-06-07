import { VisibilityStrategy } from "@home-assistant-react/types/src";

/**
 * Determines the visibility of an element based on the provided visibility strategy.
 * This function compares the current visibility strategy with the selected strategy,
 * and decides whether the element should be visible.
 *
 * @param when - The visibility strategy for the current context.
 * @param selected - The selected visibility strategy to compare against.
 * @param visibleByDefault - Whether the element should be visible if no selected strategy is provided. Default is false.
 * @returns A boolean indicating whether the element should be visible.
 *
 * @example
 * // Example usage:
 * const isElementVisible = isVisible(VisibilityStrategy.Always, VisibilityStrategy.Always);
 * console.log(isElementVisible); // Outputs: true
 *
 * const isElementHidden = isVisible(VisibilityStrategy.Always, VisibilityStrategy.Never);
 * console.log(isElementHidden); // Outputs: false
 */
export const isVisible = (
  when: VisibilityStrategy,
  selected?: VisibilityStrategy,
  visibleByDefault = false,
) => {
  if (!selected) return visibleByDefault;
  return selected === when || selected === VisibilityStrategy.Both;
};

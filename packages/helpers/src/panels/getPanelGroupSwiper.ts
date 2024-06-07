import { SwiperRef } from "swiper/react";

/**
 * Retrieves the Swiper instance associated with a specific panel group ID.
 *
 * @param groupId - The ID of the panel group for which to retrieve the Swiper instance.
 * @returns The Swiper instance associated with the specified group ID, or `null` if not found.
 *
 * @example
 * // Example usage:
 * const swiperInstance = getPanelGroupSwiper('group1');
 * if (swiperInstance) {
 *   console.log('Swiper instance found:', swiperInstance);
 * } else {
 *   console.log('Swiper instance not found.');
 * }
 */
export const getPanelGroupSwiper = (groupId: string) => {
  return (
    window.document.querySelector(
      `.swiper[data-group-id="${groupId}"]`,
    ) as unknown as SwiperRef | null
  )?.swiper;
};

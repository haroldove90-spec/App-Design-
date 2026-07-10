/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Scrolls smoothly to a target element on the page, accounting for the height
 * of the sticky/fixed header.
 * 
 * @param sectionId The HTML ID of the target element.
 * @param delay Optional delay in milliseconds to wait for state/layout changes.
 */
export function scrollToSection(sectionId: string, delay: number = 50) {
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      const header = document.getElementById("main-header");
      const headerOffset = header ? header.offsetHeight : 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, delay);
}

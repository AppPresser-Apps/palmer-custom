/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./blocks/src/hero-slider/view.js ***!
  \****************************************/
/**
 * Use this file for JavaScript code that you want to run in the front-end 
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any 
 * JavaScript running in the front-end, then you should delete this file and remove 
 * the `viewScript` property from `block.json`. 
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log("Hello World! (from create-block-hero-slider block)");
/* eslint-enable no-console */

const images = document.querySelectorAll('.hero-slider-image');

// Calculate the animation duration and delay
const totalImages = images.length;
const animationDuration = totalImages * 5; // 2 seconds per image

// Apply the animation to each image
images.forEach((image, index) => {
  const animationDelay = (totalImages - index - 1) * 5; // 2 seconds delay per image

  image.style.animation = `imgFade ${animationDuration}s ease-in-out infinite ${animationDelay}s`;
});
/******/ })()
;
//# sourceMappingURL=view.js.map
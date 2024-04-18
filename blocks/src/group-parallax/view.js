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
 
const parallaxContainers = document.querySelectorAll('.wp-block-apppressser-group-parallax');

// Function to update the background position of all .bg-parallax elements
function updateParallax() {
  // Select all .parallax-container elements
  parallaxContainers.forEach(container => {
    // Get the .bg-parallax element within the container
    const bgParallax = container.querySelector('.bg-parallax');
    if (!bgParallax) return; // Skip if no .bg-parallax found

    console.log('Scrolling in the front end.', window.scrollY);

    // Calculate the offset based on the element's position relative to the viewport
    // Get the distance from the top of the document to the current element
    const elementTopToDocumentTop = container.getBoundingClientRect().top + window.scrollY;
    // Calculate the difference between the element's top and the current scroll position
    const offset = (window.scrollY - elementTopToDocumentTop) * 0.2; // Adjust the multiplier to control the speed

    // Apply the offset to the background position
    bgParallax.style.backgroundPosition = `center ${offset}px`;
  });
}

// Add a scroll event listener to the window                
window.addEventListener('scroll', updateParallax);

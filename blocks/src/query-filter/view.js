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

import { SelectControl } from '@wordpress/components';
import { createRoot } from 'react-dom/client';
 

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

let categories = [{
    id: 0,
    slug: 'none',
    name: 'None'
}];

const response = await fetch('/wp-json/wp/v2/storerestaurantcategory?per_page=100');
categories = [ ...categories, ...await response.json()];

const urlParams = new URLSearchParams(window.location.search);

console.log(urlParams);

const container = document.getElementById('react-select');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <SelectControl
        id='category'
        label="Filter by Category:"
        value={urlParams.get('qls') || 'none'}
        options={categories.map((category) => ({
            value: category.slug,
            label: renderHTML(category.name),
        }))}
        onChange={(selectedCategoryID) => {
      
            var selectedValue = selectedCategoryID;
            if (selectedValue === "none") {
                var currentUrl = window.location.href;
                var updatedUrl = currentUrl.split("?")[0];
                window.location.href = updatedUrl;
            } else {
                var currentUrl = window.location.href;
                var urlWithoutQueryParam = currentUrl.split("?")[0];
                var urlWithQueryParam = urlWithoutQueryParam + (urlWithoutQueryParam.includes("?") ? "?" : "") + "?qls=" + selectedValue;
                window.location.href = urlWithQueryParam;
            }

        }}
    />
);
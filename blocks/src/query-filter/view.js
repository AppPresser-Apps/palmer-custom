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
import { useSelect } from '@wordpress/data';
import ReactDOM from 'react-dom';
 
/* eslint-disable no-console */
console.log("Hello World! (from create-block-query-filter block)");
/* eslint-enable no-console */

//const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const response = await fetch('/wp-json/wp/v2/storerestaurantcategory?per_page=100');
const categories = await response.json();
console.log(categories);

ReactDOM.render(
    <SelectControl
        label="Filter by Category:"
        value={''}
        options={categories.map((category) => ({
            value: category.id,
            label: category.name,
        }))}
        onChange={(selectedCategoryID) => {
            console.log(selectedCategoryID);
        }}
    />,
    document.getElementById('react-select')
);

function handleSelectChange() {
    var select = document.getElementById("'react-select");
    var selectedValue = select.value;
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

}

document.getElementById("category").addEventListener("change", handleSelectChange);
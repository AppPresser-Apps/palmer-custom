/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {

	const [ selectedCategory, setSelectedCategory ] = useState();

	const categories = useSelect( select =>
		select('core').getEntityRecords('taxonomy', 'storerestaurantcategory') || []
	);

	const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

	return (
		<div { ...useBlockProps() }>
			<SelectControl
				label="Select a category"
				value={ selectedCategory }
				options={ categories.map( ( category ) => ( { value: category.id, label: renderHTML(category.name) } ) ) }
				onChange={ ( selectedCategoryID ) => { 
					console.log( selectedCategoryID );
					setSelectedCategory( selectedCategoryID );
					// Add category slug as a URL param
					const categorySlug = categories.find( ( category ) => category.id === parseInt( selectedCategoryID) )?.slug;
					
					const urlParams = new URLSearchParams(window.location.search);
					urlParams.set('qls', categorySlug);
					window.history.replaceState(null, '', `${window.location.pathname}?${urlParams}`);
				} }
			/>
		</div>
	);
}

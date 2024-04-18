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
import { InnerBlocks, useBlockProps, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, RangeControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
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
export default function Edit({ attributes, setAttributes }) {

	const [scrollPosition, setScrollPosition] = useState(0);

	let bgPosition = 0;

    const onSelectMedia = ( newImage ) => {
		console.log(newImage);
        setAttributes({
			imageID: newImage.id,
			image: newImage.url
		});
    };

	useEffect(() => {

		const handleScroll =(e) => {
			// Dynamically get the scroll position from the event
			const scrollTop = e.target.documentElement.scrollTop || e.target.body.scrollTop;
			const scrollLeft = e.target.documentElement.scrollLeft || e.target.body.scrollLeft;
			//console.log('Scrolling in the block editor. Scroll Top:', scrollTop, 'Scroll Left:', scrollLeft);

			const elementTopToDocumentTop = e.target.documentElement.getBoundingClientRect().top + scrollTop;
			// Calculate the difference between the element's top and the current scroll position
			const offset = (scrollTop - elementTopToDocumentTop) * 0.2; // Adjust the multiplier to control the speed

			setScrollPosition(offset);

			console.log('Scrolling in the block editor.', offset);
		
			// Apply the offset to the background position
			//bgParallax.style.backgroundPosition = `center ${offset}px`;
		};


		const iframe = document.querySelector('.edit-site-visual-editor__editor-canvas');
		
        if (iframe && iframe.contentWindow) {
            // Add the scroll event listener to the iframe's content window
            iframe.contentWindow.document.addEventListener('scroll', handleScroll);
            
            // Cleanup function to remove the event listener
            return () => {
                iframe.contentWindow.document.removeEventListener('scroll', handleScroll);
            };
		} else {
			console.log('Cannot access iframe content');
		}

	}, []);

	useSelect(select => {
		// Use the 'core/block-editor' store to get details about the current block
		const editor = select('core/block-editor');
		//console.log(editor);
	});

	return (
		<div className="parallax-container" { ...useBlockProps() } style={{height: `${attributes.height}px`}}>
			<InspectorControls>
				<PanelBody
					title={__('Images', 'apppresser-blocks')}
					initialOpen={ true }
				>
				
						<MediaUpload
							onSelect={onSelectMedia}
							value={attributes.imageID}
							allowedTypes={ ['image'] }
							multiple={false}
							render={({open}) => (
								<Button variant="primary" onClick={ open }>
									Select Image
								</Button>
							)}
						/>
				
				</PanelBody>
				<PanelBody title={__('Dimensions', 'apppresser-blocks')}>
                        <RangeControl
                            label="Height"
                            value={ attributes.height }
                            onChange={ ( newHeight ) => setAttributes({ height: newHeight }) }
                            min={ 100 }
                            max={ 1000 }
                        />
                </PanelBody>
			</InspectorControls>
			<div className="bg-parallax" style={{
				height: `${attributes.height}px`,
				backgroundImage: `url(${attributes.image})`,
				backgroundSize: 'cover',
				backgroundPosition: `center -${scrollPosition}px`
			}}></div>
			<div className="bg-parallax-content" style={{
				height: `${attributes.height}px`
			}}><InnerBlocks /></div>
		</div>

	);
}


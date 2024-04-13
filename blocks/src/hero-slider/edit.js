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
import { InnerBlocks, useBlockProps, MediaUploadCheck, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

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

	const images = attributes.images || [];

	const removeMedia = () => {
		setAttributes( { mediaId: 0 } );
	};

    const onSelectMedia = ( newImages ) => {
        setAttributes( { images: [...newImages] } );
    };

	return (
		<div class="hero-slider-wrap" { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody
					title={__('Select Slider Images', 'awp')}
					initialOpen={ true }
				>
					<div className="editor-post-featured-image">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={onSelectMedia}
								value={ images.map( ( img ) => img.id ) }
								allowedTypes={ ['image'] }
								multiple
								gallery
								render={({open}) => (
									<Button onClick={ open }>
										Upload Images
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>
				</PanelBody>
			</InspectorControls>
			<div class="hero-slider">
            { images.map( ( img ) => (
                <div class="hero-slider-image" key={ img.id } style={{backgroundImage: `url(${img.url})`}}></div>
            ) ) }
			</div>
			<div class="hero-slider-overlay"></div>
			<div class="hero-slider-inner-blocks"><InnerBlocks /></div>
		</div>
	);
}

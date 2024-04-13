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
import { PanelBody, Button, RangeControl, ColorPicker } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

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

	// const { height, opacity, color } = attributes;

	const removeMedia = () => {
		setAttributes( { mediaId: 0 } );
	};

    const onSelectMedia = ( newImages ) => {
        setAttributes( { images: [...newImages].reverse() } );
    };

	useEffect(() => {
        // Get all the images
        const images = document.querySelectorAll('.hero-slider-image');

        // Calculate the animation duration and delay
        const totalImages = images.length;
        const animationDuration = totalImages * 5; // seconds per image

        // Apply the animation to each image
        images.forEach((image, index) => {
            const animationDelay = (totalImages - index - 1) * 5; // seconds delay per image
            image.style.animation = `imgFade ${animationDuration}s ease-in-out infinite ${animationDelay}s`;
        });
    }, []);

	return (
		<div { ...useBlockProps({ className: 'hero-slider-wrap' }) }>
			<InspectorControls>
				<PanelBody
					title={__('Images', 'apppresser-blocks')}
					initialOpen={ true }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectMedia}
							value={ attributes.images.map( ( img ) => img.id ) }
							allowedTypes={ ['image'] }
							multiple
							gallery
							render={({open}) => (
								<Button variant="primary" onClick={ open }>
									Select Images
								</Button>
							)}
						/>
					</MediaUploadCheck>
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
				<PanelBody title={__('Styles', 'apppresser-blocks')}>
					<RangeControl
						label={__('Overlay Opacity', 'apppresser-blocks')}
						value={ attributes.opacity }
						onChange={ ( newOpacity ) => setAttributes({ opacity: newOpacity }) }
						min={ 0 }
						max={ 1 }
						step={ 0.01 }
					/>
					<label>{__('Overlay Color', 'apppresser-blocks')}</label>
					<ColorPicker
						color={ rgbaToHex(attributes.color) }
						onChangeComplete={ ( newColor ) => { console.log(newColor), setAttributes({ color: newColor.rgb }); } }
						disableAlpha
					/>
            	</PanelBody>
			</InspectorControls>
			<div class="hero-slider" style={{height: `${attributes.height}px`}}>
            { attributes.images.map( ( img ) => (
                <div class="hero-slider-image" key={ img.id } style={{backgroundImage: `url(${img.url})`}}></div>
            ) ) }
			</div>
			<div class="hero-slider-overlay" style={{backgroundColor: `rgba( ${attributes.color.r},${attributes.color.g},${attributes.color.b},${attributes.opacity})`}}></div>
			<div class="hero-slider-inner-blocks"><InnerBlocks /></div>
		</div>
	);
}


function rgbaToHex(rgba) {
    let r = rgba.r.toString(16);
    let g = rgba.g.toString(16);
    let b = rgba.b.toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}
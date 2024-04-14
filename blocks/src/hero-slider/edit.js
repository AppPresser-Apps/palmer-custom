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

    const onSelectMedia = ( newImages ) => {
        setAttributes({ images: [...newImages] });
    };

	const onDurationChange = ( newDuration ) => {
		setTimeout(() => {
			setAttributes({ duration: newDuration });
		}, 500);
        
    };

	const totalImages = attributes.images.length;
	const animationDuration = totalImages * attributes.duration; // seconds per image
	const isOdd = totalImages % 2 === 1;
	const animation = isOdd ? 'imgFadeOdd' : 'imgFade';

	console.log('totalImages', totalImages);
	console.log('animationDuration', animationDuration);

    useEffect(() => {
    }, []);


	return (
		<div { ...useBlockProps() }>
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
                            label="Duration"
                            value={ attributes.duration }
                            onChange={onDurationChange}
                            // min={ 1 }
                            // max={ 30 }
                        />
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
						onChangeComplete={ ( newColor ) => setAttributes({ color: newColor.rgb }) }
						disableAlpha
					/>
            	</PanelBody>
			</InspectorControls>
			<div className="hero-slider" style={{height: `${attributes.height}px`}}>
            { attributes.images.map( (img, index) => (
                <div className="hero-slider-image" key={index} style={{backgroundImage: `url(${img.url})`, animation: `${animation} ${animationDuration}s ease-in-out infinite ${(totalImages - index - 1) * attributes.duration}s` }}></div>
            ) ) }
			</div>
			<div className="hero-slider-overlay" style={{backgroundColor: `rgba( ${attributes.color.r},${attributes.color.g},${attributes.color.b},${attributes.opacity})`}}></div>
			<div className="hero-slider-inner-blocks"><InnerBlocks /></div>
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
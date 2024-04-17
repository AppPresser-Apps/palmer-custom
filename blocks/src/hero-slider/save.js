/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({attributes}) {

	const images = attributes.images || [];

	const totalImages = attributes.images.length;

	return (
		<div { ...useBlockProps.save() } data-duration={attributes.duration}>
			<div className="hero-slider" style={{height: `${attributes.height}px`}}>
			{ images.map( ( img, index ) => (
                <div className="hero-slider-image" key={ img.id } style={{
					backgroundImage: `url(${img.url})`, 
					height: `${attributes.height}px`, 
					animation: `imgFade ${attributes.duration}s infinite `, 
					animationDelay: `-${attributes.duration / totalImages * index}s`
				}}></div>
            ) ) }
			</div>
			<div className="hero-slider-overlay" style={{backgroundColor: `rgba( ${attributes.color.r},${attributes.color.g},${attributes.color.b},${attributes.opacity})`}}></div>
			<div className="hero-slider-inner-blocks"><InnerBlocks.Content /></div>
		</div>
	);
}

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

	return (
		<div class="hero-slider-wrap" { ...useBlockProps.save() }>
			<div class="hero-slider">
			{ images.map( ( img ) => (
                <div class="hero-slider-image" key={ img.id } style={{backgroundImage: `url(${img.url})`}}></div>
            ) ) }
			</div>
			<div class="hero-slider-overlay"></div>
			<div class="hero-slider-inner-blocks"><InnerBlocks.Content /></div>
		</div>
	);
}

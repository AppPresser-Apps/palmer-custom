/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;
const { InspectorControls  } = wp.blockEditor;
const { TextControl, PanelBody } = wp.components;
const { select } = wp.data;


// Restrict to specific block names
const allowedBlocks = ['woocommerce/handpicked-products'];

/**
 * Add custom attribute for section separator.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes(settings) {

    //check if object exists for old Gutenberg version compatibility
    //add allowedBlocks restriction
    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
        console.log(settings);
        settings.attributes = Object.assign(settings.attributes, {
            author: {
                type: 'string',
                default: '',
            }
        });

    }

    return settings;
}

addFilter(
	'blocks.registerBlockType',
	'apppresser/custom-attributes',
	addAttributes
);

/**
 * Add section divider controls on Advanced Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent((BlockEdit) => {
    return (props) => {

        if (!allowedBlocks.includes(props.name)) {
            return(<BlockEdit {...props} />);
        }

        const {
            name,
            attributes,
            setAttributes,
            isSelected,
        } = props;

        const { author } = attributes;

        const changeColor = (value) => {
            setAttributes({ author: value });
            console.log(props);
        }

        return (
            <Fragment>
                <BlockEdit {...props} />
                {isSelected && allowedBlocks.includes(name) &&
                    <InspectorControls>
                        <PanelBody title={__('Vendor Settings', 'apppresser-blocks')}>
                            <TextControl
                                label="Author" // Add a label for clarity
                                value={attributes.author || ''} // Bind the input to the author attribute
                                onChange={(value) => changeColor(value)} // Use changeColor or rename it to something more appropriate like changeAuthor
                            />
                        </PanelBody>
                    </InspectorControls>
                }
            </Fragment>
        );
    };
}, 'withAdvancedControls');

addFilter(
    'editor.BlockEdit',
    'apppresser/custom-advanced-control',
    withAdvancedControls
);

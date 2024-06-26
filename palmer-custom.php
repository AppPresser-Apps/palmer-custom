<?php
/**
 * Plugin Name:       Palmer Custom
 * Description:       AppPresser custom code.
 * Requires at least: 6.5
 * Requires PHP:      7.0
 * Version:           1.1.6
 * Author:            AppPresser
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       apppresser-blocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'PALMER_CUSTOM_DIR', plugin_dir_path( __FILE__ ) );
define( 'PALMER_CUSTOM_URL', plugins_url( basename( __DIR__ ) ) );
define( 'PALMER_CUSTOM_SLUG', plugin_basename( __FILE__ ) );
define( 'PALMER_CUSTOM_FILE', __FILE__ );

require_once PALMER_CUSTOM_DIR . 'includes/woo.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function load_palmer_custom_block_init() {
	// Register blocks in the format $dir => $render_callback.
	$blocks = array(
		'hero-slider'    => '',
		'group-parallax' => '',
		'query-filter'   => '',
	);

	foreach ( $blocks as $dir => $render_callback ) {
		$args = array();
		if ( ! empty( $render_callback ) ) {
			$args['render_callback'] = $render_callback;
		}
		register_block_type( PALMER_CUSTOM_DIR . '/blocks/build/' . $dir, $args );
	}
}
add_action( 'init', 'load_palmer_custom_block_init' );

/**
 * Enqueue Editor assets.
 */
function palmer_custom_enqueue_editor_assets() {
	wp_enqueue_script(
		'app-blocks-editor-scripts',
		plugins_url( '/assets/build/js/editor-script.js', __FILE__ )
	);
	wp_enqueue_style(
		'app-blcoks-editor-styles',
		plugins_url( '/assets/build/css/editor-styles.css', __FILE__ )
	);
}
add_action( 'enqueue_block_editor_assets', 'palmer_custom_enqueue_editor_assets' );


/**
 * Plugin updater. Gets new version from Github.
 */
if ( is_admin() ) {

	function bprest_updater() {

		require 'plugin-update/plugin-update-checker.php';
		$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
			'https://github.com/AppPresser-Apps/apppresser-blocks',
			__FILE__,
			'apppresser-blocks'
		);

		// Set the branch that contains the stable release.
		$myUpdateChecker->setBranch( 'main' );
		$myUpdateChecker->getVcsApi()->enableReleaseAssets();
	}
	bprest_updater();
}

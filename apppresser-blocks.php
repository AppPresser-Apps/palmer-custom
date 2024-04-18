<?php
/**
 * Plugin Name:       Apppresser Blocks
 * Description:       AppPresser Blocks is a collection of custom blocks for the WordPress block editor.
 * Requires at least: 6.5
 * Requires PHP:      7.0
 * Version:           1.0.9
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

define( 'APPPRESSER_BLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'APPPRESSER_BLOCKS_URL', plugins_url( basename( __DIR__ ) ) );
define( 'APPPRESSER_BLOCKS_SLUG', plugin_basename( __FILE__ ) );
define( 'APPPRESSER_BLOCKS_FILE', __FILE__ );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function load_apppresser_blocks_block_init() {
	// Register blocks in the format $dir => $render_callback.
	$blocks = array(
		'hero-slider'        => '',
		'group-parallax'        => '',
	);

	foreach ( $blocks as $dir => $render_callback ) {
		$args = array();
		if ( ! empty( $render_callback ) ) {
			$args['render_callback'] = $render_callback;
		}
		register_block_type( APPPRESSER_BLOCKS_DIR . '/blocks/build/' . $dir, $args );
	}
}
add_action( 'init', 'load_apppresser_blocks_block_init' );

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
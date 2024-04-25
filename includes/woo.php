<?php 

function filter_woocommerce_api_product_response( $product_data, $product, $fields, $this_server ) { 
    $product_data['vendor_id'] = get_post_field( 'post_author', $product->id);
    $product_data['vendor_name'] = get_the_author_meta( 'display_name', $product_data['vendor_id']);
    return $product_data; 


};      
//add_filter( 'woocommerce_api_product_response', 'filter_woocommerce_api_product_response', 10, 4 ); 


function filter_woocommerce_api_product_query( $query_args, $request, $server, $this_server ) { 
    $query_args['author'] = $this_server->get('vendor_id');
    error_log(print_r($query_args, true));
    return $query_args; 
};
//add_filter( 'woocommerce_api_product_query', 'filter_woocommerce_api_product_query', 10, 4 ); 


/**
 * Overide the php template for BuddyPress. It uses page.php by default.
 *
 * @param string $template
 * @return string
 */
function square_use_editor_page_template( $template ) {

    global $post, $wp_query, $_wp_current_template_content, $_wp_current_template_id; // Access global post object

    // Get all query vars
    $query_vars = $wp_query->query_vars;

    if ( $query_vars['pagename'] === 'store' ) {
        wp_redirect( home_url() );
        exit;
    }

	if ( isset( $query_vars['store'] ) ) {
        
		$template_content = '<!-- wp:template-part {"slug":"header","area":"header","tagName":"header"} /-->

        <!-- wp:group {"tagName":"main","style":{"spacing":{"margin":{"top":"0"}}}} -->
        <main class="wp-block-group" style="margin-top:40px">
            <!-- wp:post-content {"lock":{"move":false,"remove":true},"layout":{"type":"constrained"}} /-->
        </main>
        <!-- /wp:group -->
        
        <!-- wp:template-part {"slug":"footer","area":"footer","tagName":"footer"} /-->';

		$_wp_current_template_content = $template_content;
	}
	return $template;
}
add_filter( 'template_include', 'square_use_editor_page_template', 99 );


function woo_use_editor_page_template( $template, $template_name, $template_path ) {

    global $wp_query; // Access the global $wp_query object

    // Get all query vars
    $query_vars = $wp_query->query_vars;

	if ( isset( $query_vars['store'] ) ) {
		$new_template = ABSPATH . '/wp-includes/template-canvas.php';
		return $new_template;
	}
	return $template;
}
add_filter( 'dokan_locate_template', 'woo_use_editor_page_template', 10, 3 );

function square_custom_content( $content ) {

	global $_wp_current_template_id, $wp_query;

    // Get all query vars
    $query_vars = $wp_query->query_vars;

    $custom_store_url = dokan_get_option( 'custom_store_url', 'dokan_general', 'store' );

    $page = get_page_by_path( $custom_store_url );

	if ( $page && isset( $query_vars['store'] ) ) {
        return do_shortcode( do_blocks( $page->post_content ) . '[dokan_vendor_products vendor="' . $query_vars["author"] . '"]' );
	}

	return $content;
}
add_filter( 'the_content', 'square_custom_content', 99 );
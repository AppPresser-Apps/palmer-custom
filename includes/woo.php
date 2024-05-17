<?php 

function filter_woocommerce_api_product_response( $product_data, $product, $fields, $this_server ) { 
    $product_data['vendor_id'] = get_post_field( 'post_author', $product->id);
    $product_data['vendor_name'] = get_the_author_meta( 'display_name', $product_data['vendor_id']);
    return $product_data; 


};      
//add_filter( 'woocommerce_api_product_response', 'filter_woocommerce_api_product_response', 10, 4 ); 


function filter_woocommerce_api_product_query( $query_args, $request, $server, $this_server ) { 
    $query_args['author'] = $this_server->get('vendor_id');
    // error_log(print_r($query_args, true));
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

function appp_square_custom_content( ) {

    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 5,
        'offset' => 0
    );
    $query = new WP_Query($args);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();
            $content = get_the_content();

            appp_replace_img_urls_in_content( $content );
            
            //error_log(print_r($content, true));
        }
        wp_reset_postdata();
    }
  
}


function appp_replace_img_urls_in_content( $content ) {
    $site_url = 'palmersquare.com';
    $local_url = 'psquare.local';
    $dom = new DOMDocument();
    libxml_use_internal_errors(true);
    $dom->loadHTML($content);
    libxml_clear_errors();
    $images = $dom->getElementsByTagName('img');

   

    foreach ($images as $img) {
        $src = $img->getAttribute('src');

        error_log(print_r($src , true));

        $src = str_replace($site_url, $local_url, $src);
        $local_path = ABSPATH . str_replace(home_url(), '', $src);

        if (!file_exists($local_path)) {
            $img_data = file_get_contents('https://' . $site_url . $src);
            if ($img_data) {
                file_put_contents($local_path, $img_data);
                $file = array(
                    'name' => basename($local_path),
                    'type' => wp_check_filetype(basename($local_path), null),
                    'tmp_name' => $local_path,
                    'error' => 0,
                    'size' => filesize($local_path)
                );
                $overrides = array(
                    'test_form' => false,
                    'test_size' => true,
                );
                $results = wp_handle_sideload($file, $overrides);
                if (!empty($results['error'])) {
                    // Handle error
                } else {
                    $src = $results['url'];
                }
            }
        }

        $img->setAttribute('src', $src);
    }

    $content = $dom->saveHTML();
    return $content;
}


function appp_get_attachment_ids() {


    global $wpdb;

    require_once(ABSPATH . 'wp-admin/includes/media.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/image.php');


    $args = array(
        'post_type' => 'post',
        'posts_per_page' => 1,
        'offset' => 0
    );
    $query = new WP_Query($args);

    // error_log(print_r($query->posts, true));

    $attachment_ids = array();

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $id = get_the_ID();
            $featured_img_id = get_post_thumbnail_id($id);
            $featured_img_url = get_the_post_thumbnail_url($id, 'full');
            $featured_img_path = get_attached_file($featured_img_id);

            if ( $featured_img_url && !file_exists( $featured_img_path ) ) {
              
                $new_url = str_replace('psquare.local', 'palmersquare.com', $featured_img_url );

                $attachment_id = media_sideload_image( $new_url, 0, null, 'id' );

                if ( !is_wp_error( $attachment_id) ) {
                    $attachment_ids[] = $attachment_id;

                    set_post_thumbnail($id, $attachment_id);
                }

            }

           
        }
        wp_reset_postdata();
    }

    return $attachment_ids;
}


function appp_get_broken_images() {

    global $wpdb;

    require_once(ABSPATH . 'wp-admin/includes/media.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/image.php');

    $query = $wpdb->prepare(
        "SELECT * FROM {$wpdb->posts} WHERE post_type = 'attachment' AND guid LIKE %s LIMIT 1",
        '%palmersquare.com/wp-content/uploads%'
    );

    $results = $wpdb->get_results($query);

    // Process the results
    foreach ($results as $result) {
        // Get the attachment URL
        $attachment_url = $result->guid;

        // Upload the file to the media library
        $attachment_id = media_sideload_image( $attachment_url, 0, null, 'id' );

        error_log(print_r($attachment_id, true));

        // Check if the file was uploaded successfully
        if (!is_wp_error($attachment_id)) {
            // Get the new attachment URL
            $new_attachment_url = wp_get_attachment_url($attachment_id);

            error_log(print_r($new_attachment_url, true));

            // Replace the old GUID with the new attachment URL
            // $wpdb->update(
            //     $wpdb->posts,
            //     array('guid' => $new_attachment_url),
            //     array('ID' => $result->ID)
            // );
        }
    }

    return $results;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'appp/v1', '/get-broken-images', array(
        'methods'  => 'GET',
        'callback' => 'appp_square_custom_content',
    ) );
} );
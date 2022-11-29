<?php

    

    /*
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    */
    
    //Get the ID
    $postid = $_GET["id"];
    
    //Create the JSON
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    echo GetLocationData($postid);
    http_response_code(200);
    

    //Function to Create the GeoJSON layer
    function GetLocationData($PostId) {
    
        require "/home/wtk3vlq0kjjx/public_html/slowcamino.com/wp-blog-header.php";
        require "./utilities.php";
        
       //Get the location-pin type posts.
        $filter  = [ "post_type" => "location-pin" , "p" => $PostId ];
    
        //Perform the query
        $query = new WP_Query( $filter );
        
        //Initialize the JSON
        $json = null;
        

        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();
                
                $galleryJson = "[".str_replace('\"', '"', ParsePostIdArrayString(GetMeta("photo_gallery")))."]";
                $gallery = json_decode($galleryJson);

                foreach ($gallery as &$photo) {
                    $link = wp_get_attachment_image_src( $photo->id, 'Large', false );
                    $photo->url = $link[0];
                }
            
                $json = '{
                    "Image":"'.GetImage().'",
                    "Content":"'.str_replace('"', '\"', GetMeta("popup_content")).'",
                    "FlyTo":'. (GetMeta("fly_to") ? "1" : "0") .',
                    "Visited":"'.GetMeta("visited").'",
                    "Articles":"['.ParsePostIdArrayString(GetMeta("article")).']",
                    "Gallery":'.json_encode($gallery).'
                }';
            }
        }
        
        /* Restore original Post Data */
        wp_reset_postdata();

        return $json;
            
    }
    
    //A function to get the URL of the Featured Image
    function GetImage() {
        $thumb_id = get_post_thumbnail_id();
        $thumb_url_array = wp_get_attachment_image_src($thumb_id, 'thumbnail-size', true);
        $thumb_url = $thumb_url_array[0];
        return $thumb_url;
    }

?>


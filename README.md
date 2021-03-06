image_zoomer
============

This jQuery plugin allows users to have zoom effect for their images. CSS based zooming solutions exist but they work by resizing target image to make it look smaller and then setting CSS properties to view portions of that image and give an illusion that image is zoomed. It is not actual zooming as user is just seeing true version of target image.

This plugin actually zooms images by displaying scaled portion of images. 

### How to use
	
	// use jQuery to select elements
	$("img.zoom_it").each(function() {
    	$(this).image_zoomer();
  	});  	  	

By-default `height` and `width` of zoom lens are set to `90` and `zoom-level` or `scale` is set to `1.5`. You can easily override these default settings. For example:

	var options = {height: 120, width: 120, scale: 2};
	$("img.zoom_it").each(function() {
    	$(this).image_zoomer(options);
  	});
  	
To destroy or taking-off zooming effect from any image you can use following code.

	$("img.zoom_it:first").image_zoomer("destroy");
	
By using CSS selector of your choice you can take-off image zooming effect from single or multiple images of your choice. In above example I' am just taking-off image effect from first image and other images still have zoom effect.


### Supported Browsers

This jQuery plugin can be used in all browsers that support `canvas` element. However this has been tested with Chrome and Firefox.

### Contributing


1. Fork
2. Report issues
3. Submit Pull Requests
4. Test this plugin with other browsers



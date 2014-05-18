image_zoomer
============

This jQuery plugin allows users to have zoom effect for their images. CSS based zooming solutions exist but they work by resizing target image to make it look smaller and then setting CSS properties to view portions of that image and give an illusion that image is zoomed. It is not actual zooming as user is just seeing true version of target image.

This plugin actually zooms images by displaying scaled portion of images. 

### How to use
	
	// use jQuery to select elements
	$("img.zoom_it").each(function() {
    	$(this).image_zoomer();
  	});

You can also pass options to set height and width of zoom lens. For example:

	var options = {height: 90, width: 90};
	$("img.zoom_it").each(function() {
    	$(this).image_zoomer(options);
  	});


### Supported Browsers

This jQuery plugin can be used in all browsers that support `canvas` element. However this has been tested with Chrome and Firefox.

### Contributing


1. Fork
2. Report issues
3. Submit Pull Requests
4. Test this plugin with other browsers



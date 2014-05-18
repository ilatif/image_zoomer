(function($) {

  var zoom_context, zoom_canvas  = "<canvas id='zoom_canvas' style='position: absolute;'></canvas>";
  var zoom_canvas_container_name = "#zoom_canvas_container", zoom_canvas_name = "#zoom_canvas";

  $.fn.image_zoomer = function(options) {

    // extend default options with passed ones
    var options = $.extend({
      height: 90,
      width: 90,
      scale: 1.5
    }, options);

    var image = this;

    this.mouseenter(function(e) {
      var elem = this;
      if ($(zoom_canvas_container_name).length == 0) {
        $(this).wrap("<span id='zoom_canvas_container'></span>");
        var zoom_canvas_container = $(zoom_canvas_container_name);
        zoom_canvas_container.mousemove(function(e) {
          zoom_image_mousemove(zoom_canvas_container, e, options, image);
          return false;
        }).mouseleave(zoom_image_mouseleave);
      }
    });
    return this;
  }

  function zoom_image_mousemove(elem, e, options, image) {
    if ($(zoom_canvas_name).length == 0) {
      $(elem).append(zoom_canvas);
      $(zoom_canvas_name).attr("width", options.width).attr("height", options.height).css({"border-radius": "50%", "-moz-border-radius": "50%", "-webkit-border-radius": "50%"});
      zoom_context = $(zoom_canvas_name).get(0).getContext('2d');
      zoom_context.scale(options.scale, options.scale);
    }
    _zoom_image(e, options, image);
  }

  function zoom_image_mouseleave(e) {
    _remove_image_zoomer();
  }

  function _zoom_image(e, options, image) {
    var coordinates = _prepare_coordinates(e, options, image);
    $(zoom_canvas_name).css({left: coordinates.page_x, top: coordinates.page_y, "z-index": 99});
    zoom_context.drawImage(image.get(0), coordinates.image_x, coordinates.image_y, options.width, options.height, 0, 0, options.width, options.height);
  }

  function _prepare_coordinates(e, options, image) {
    var page_x = e.pageX, page_y = e.pageY, image_width  = image.width(), image_height = image.height(), image_offset = image.offset(), page_coodinates;
    
    page_coodinates = {page_x: page_x, page_y: page_y};
    if (page_x - image_offset.left > image_width / 2) {
      page_coodinates.page_x -= options.width;
    }
    if (page_y - image_offset.top > image_height / 2) {
      page_coodinates.page_y -= options.height;
    }
    page_coodinates.image_x = page_coodinates.page_x - image_offset.left;
    page_coodinates.image_y = page_coodinates.page_y - image_offset.top;
    return page_coodinates;
  }

  function _remove_image_zoomer() {
    $(zoom_canvas_name).remove();
    $(zoom_canvas_container_name).find("img").unwrap();
  }

})(jQuery);

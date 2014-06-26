(function($) {

  var zoom_context, zoom_canvas  = "<canvas id='zoom_canvas' style='position: absolute; border: solid 1px #e8e8e8;'></canvas>";
  var zoom_canvas_container_name = "#zoom_canvas_container", zoom_canvas_name = "#zoom_canvas", temp_image_canvas_context, remove_image_zoomer_timer;

  $.fn.image_zoomer = function(options) {

    if (typeof options == "string" && options == "destroy") {
      this.data("is_destroyed", true);
      return this;
    } else {
      // extend default options with passed ones
      var options = $.extend({
        height: 90,
        width: 90,
        scale: 1.5
      }, options);
      this.data("is_destroyed", false);
    }

    var image = this;

    this.mouseenter(function(e) {
      if ($(this).data("is_destroyed")) {
        return false;
      }
      if ($(zoom_canvas_container_name).length == 0) {
        $(this).wrap("<span id='zoom_canvas_container'></span>");
        var zoom_canvas_container = $(zoom_canvas_container_name);
        var temp_image_canvas     = _insert_temp_canvas(zoom_canvas_container, image);
        $(zoom_canvas_container).mousemove(function(e) {
          if ($(zoom_canvas_name).length == 0) {
            create_zoom_canvas(options);
            $(zoom_canvas_name).mousemove(function(e) {
              zoom_image_mousemove(zoom_canvas_container, e, options, image, temp_image_canvas, true);
              return false;
            }).mouseleave(zoom_image_mouseleave);
          }
          zoom_image_mousemove(zoom_canvas_container, e, options, image, temp_image_canvas, false);
          return false;
        });
      }
      return false;
    });
    return this;
  }

  function create_zoom_canvas(options) {  
    $("body").append(zoom_canvas);
    $(zoom_canvas_name).attr("width", options.width).attr("height", options.height);
    zoom_context = $(zoom_canvas_name).get(0).getContext('2d');
    zoom_context.scale(options.scale, options.scale);
  }

  function zoom_image_mousemove(elem, e, options, image, temp_image_canvas, check_bounds) {
    var image_offset = image.offset();
    if (check_if_in_bounds(e, image, image_offset)) {
      zoom_context.clearRect(0, 0, options.width, options.height);
      zoom_image(e, options, temp_image_canvas, image_offset);
    } else if (check_bounds) {
      zoom_image_mouseleave();
    }
  }

  function zoom_image_mouseleave(e) {
    remove_image_zoomer();
  }

  function zoom_image(e, options, temp_image_canvas, image_offset) {
    var coordinates = _prepare_coordinates(e, options, image_offset);
    $(zoom_canvas_name).css({left: coordinates.page_x, top: coordinates.page_y, "z-index": 99});
    try {
      zoom_context.drawImage(temp_image_canvas.get(0), coordinates.image_x, coordinates.image_y, options.width, options.height, 0, 0, options.width, options.height);
    } catch(err){};
  }

  function _prepare_coordinates(e, options, image_offset) {
    var page_x = e.pageX, page_y = e.pageY, coordinates;
    coordinates         = {page_x: page_x - options.width / 2, page_y: page_y - options.height / 2};
    coordinates.image_x = (page_x - image_offset.left) - (options.width / 2 / options.scale);
    coordinates.image_y = (page_y - image_offset.top) - (options.height / 2 / options.scale);
    return coordinates;
  }

  function _insert_temp_canvas(zoom_canvas_container, image) {
    var width = image.width(), height = image.height(), temp_image_canvas;
    zoom_canvas_container.append("<canvas id='temp_image_canvas' width='" + width + "' height='" + height + "' style='position: absolute; left: -5000px;'></canvas>");
    temp_image_canvas = $("#temp_image_canvas");
    temp_image_canvas_context = temp_image_canvas.get(0).getContext("2d");
    temp_image_canvas_context.drawImage(image.get(0), 0, 0, width, height);
    return temp_image_canvas;
  }

  function check_if_in_bounds(e, image, image_offset) {
    if (e.pageX < image_offset.left) { // User moved mouse out in left direction
      return false;
    } else if (e.pageY < image_offset.top) { // User moved mouse out in top direction
      return false;
    } else if (e.pageX > image_offset.left + image.width()) { // User moved mouse out in right direction
      return false;
    } else if (e.pageY > image_offset.top + image.height()) { // User moved mouse out in bottom direction
      return false;
    }
    return true;
  }

  function remove_image_zoomer() {
    $(zoom_canvas_name).remove();
    $(zoom_canvas_container_name).find("img").unwrap();
    $("#temp_image_canvas").remove();
  }

})(jQuery);

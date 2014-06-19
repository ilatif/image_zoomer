$(function() {

  var sl = $("#section-slides");

  sl.mousewheel(function(event, delta) {
    if (delta < 0) sl.css("top", "-100%");
    else
    sl.css("top", "0%");
  });

  var options = {
    height: 120,
    width: 120
  };

  $("img").each(function() {
    $(this).image_zoomer(options);
  });

});
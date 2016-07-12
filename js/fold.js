$(document).ready(function() {
  var foldShowSvg = '<svg viewBox="0 0 42 42"><polygon fill="#308bd8" points="42,19 23,19 23,0 19,0 19,19 0,19 0,23 19,23 19,42 23,42 23,23 42,23"/></svg>';
  var foldHideSvg = '<svg viewBox="0 0 42 42"><rect fill="#308bd8" y="19" width="42" height="4"/></svg>';

  $('.fold-show').prepend(foldShowSvg);
  $('.fold-hide').prepend(foldHideSvg);

  $('.fold').next().hide();

  $('.fold').click(function() {
    $(this).children('.fold-show').toggle();
    $(this).children('.fold-hide').toggle();
    var nextElemnt = $(this).next();
    if(!nextElemnt.is(':animated')){
      nextElemnt.slideToggle();
    }
  });
});

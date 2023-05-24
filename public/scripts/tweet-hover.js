$(document).ready(function() {
  console.log('document is ready from script hover.js');
  

  $(".tweet").on("mouseenter", function () {
    $(this).addClass('tweet-hovered');
  });

  $(".tweet").on("mouseleave", function () {
    $(this).removeClass('tweet-hovered');
  });

  $(".footer-icon").on("mouseenter", function () {
    $(this).addClass('icon-hovered');
  });

  $(".footer-icon").on("mouseleave", function () {
    $(this).removeClass('icon-hovered');
  });

})
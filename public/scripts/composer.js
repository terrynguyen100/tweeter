$(document).ready(function() {
  $('div.navBarRight').css('cursor', 'pointer');
  $('#go-top-icon').css('cursor', 'pointer');

  //Write-a-new-tweet button at top right
  $('.compose').on('click', function() {
    if ($('#new-tweet-container').css('display') === 'flex') {
      $('#error').slideUp("fast", function() {
        $('#new-tweet-container').slideUp("slow");
      });
    } else {
      $('#new-tweet-container').slideDown("slow", function() {
        $("#tweet-text").focus();
      });
    }
  });
  

  //Hiding the write-a-new-tweet button at top right when scroll down 300px
  //Show the go-top-icon when scroll down more than 300px
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) {
      $('div.navBarRight').addClass('hide');
      $('#go-top-icon').css('display', 'inline');
    } else { //Reversing
      $('div.navBarRight').removeClass('hide');
      $('#go-top-icon').css('display', 'none');
    }
  });

  //Go-top-icon button
  $('#go-top-icon').on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    $('#new-tweet-container').slideDown("slow", function() {
      $("#tweet-text").focus();
    });
  });
});

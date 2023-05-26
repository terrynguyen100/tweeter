$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {
    let currentCounter = 140 - $(this).val().length;
    $(this).parent().find("output").text(currentCounter);

    if (currentCounter < 0) {
      $(this).parent().find("output").addClass('neg');
    } else {
      $(this).parent().find("output").removeClass('neg');
    }
  });
});
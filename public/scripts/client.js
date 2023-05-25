/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
function escape (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
function createTweetElement (tweetData) {
  //XSS vulnerability fixed
  const $tweet = $(`
    <article class="tweet">
      <header class="tweet-header">
        <div class="user-info">
          <img src = "${escape(tweetData.user.avatars)}">
          <span>${escape(tweetData.user.name)}</span>
        </div>
        <span class="tweet-user-name">${escape(tweetData.user.handle)}</span>
      </header>
      <p>${escape(tweetData.content.text)}</p>
      <footer>
        <span class="timeago"> ${escape(timeago.format(tweetData.created_at))}</span>
        <div>
          <i class="fa-solid fa-flag footer-icon"></i>
          <i class="fa-solid fa-retweet footer-icon"></i>
          <i class="fa-solid fa-heart footer-icon"></i>
        </div>
      </footer>
    </article>`);
  return $tweet;
}
function renderTweet (data) {
  $('#tweets-container').empty();

  for (const tweet of data) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }

}
function fetchTweets () {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'GET',
    success: (response) => {
      renderTweet(response);
    }
  })
}
function postTweet (tweet) {

  const urlencodedstring = tweet.serialize();
  //make a POST request to the server with the form's data
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'POST',
    data: urlencodedstring
  }).then(() => {
    console.log('successfully added a new tweeet');
    fetchTweets();
  })

  //reset the textarea to blank and the counter to 140 char
  $('#tweet-text').val("");
  $('output.counter').text(140) ;
}
function setEnterAsSubmit () {
  $("#new-tweet-form").keypress(function(event) {
    if (event.which === 13) { // 13 is the keycode for Enter key
      event.preventDefault();
      $("#new-tweet-form").submit();
    }
  })
}

function tweetValidation () {
  if ($('#tweet-text').val() === "") {
    $('#error p').text("Tweet cannot be empty.")
    $('#error').slideDown("slow")
    return false;
  } else if ($('#tweet-text').val().length > 140) {
    $('#error p').text("Tweet cannot be more than 140 characters")
    $('#error').slideDown("slow")
    return false;
  } else {
    console.log('passed validation, returning true');
    return true;
  }
}
$(document).ready(function() {
  fetchTweets();
  setEnterAsSubmit();
  const $newTweet = $('#new-tweet-form');

  //a listening event for the new tweet form 'submit'
  $newTweet.on('submit', function (event) {
    event.preventDefault();
    
    //slide up the error message before removing it from our HTML everytime submit is clicked
    $('#error').slideUp("fast", function () {
      // $('section').remove('#new-tweet-error');
      if (tweetValidation()) {
        postTweet($newTweet);
      }
    })
  })
})
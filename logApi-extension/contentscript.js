$(document).ready(function () {

    // register events here
    $('.question-hyperlink, #hot-network-questions [href]').on('click', {event_type: 'click_question'}, logEvents);
    $('.post-tag').on('click', {event_type: 'click_tag'}, logEvents);
    $('.f-input, .js-search-field').on('click', {event_type: 'search'}, logEvents);
    $('#answers #post-form #submit-button').on('click', {event_type: 'post_answer'}, logEvents);
    $('.comments-link').on('click', {event_type: 'comment'}, logEvents);
    $('[href="/questions/ask"]').on('click', {event_type: 'ask_question'}, logEvents);
    $('.vote a').on('click', {event_type: 'thumb_up_down'}, logEvents);
    $('.user-info a').on('click', {event_type: 'user_info'}, logEvents);
    $('.job-link').on('click', {event_type: 'job'}, logEvents);
    $('.star-off, .star-on').on('click', {event_type: 'favorite'}, logEvents);

    function logEvents(event){
      var obj = new Object();
      obj.user = '';
      obj.type = event.data.event_type;
      var time = new Date().getTime();
      var date = new Date(time);
      obj.time = date.toString();
      obj.innerHTML = event.target.innerHTML;
      obj.outerHTML = event.target.outerHTML;
      backgroundMessageLogs(obj);
    }

    function backgroundMessageLogs(obj) {
        chrome.runtime.sendMessage(obj, function(response) {
            console.log("background.js JSON push: " + obj);
        });
    }
});
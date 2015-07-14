var vote_function = function () {
  var tid = $(this).parent().attr('data-id');
  var $this = $(this);
  var vote = ($this.hasClass('upvote') ? 1 : -1);
  $.get('http://pestkolera.se/app_top.php?vote=' + vote + '&tid=' + tid, function (data) {
    $this.parent().find('.active').removeClass('active');
    $this.addClass('active');
  });
};

var get_questions_factory = function (option) {
  return function (data) {
    var top_questions = JSON.parse(data);
    var $mall = $('.' + option + 'Questions tr.hide');
    top_questions.forEach(function (e, i) {
      var $e = $mall.clone().insertAfter($mall);
      $e.children('.pest').text(e.pest);
      $e.find('.kolera').text(e.kolera);
      $e.attr('data-id', e.tid);
      $e.attr('data-grade', e.grade);
      $e.removeClass('hide');
    });

    $('.' + option + 'Questions.hide').removeClass('hide');
  };
};

$(document).ready(function () {
  $.get('http://pestkolera.se/app_top.php', get_questions_factory('top'));
  $.get('http://pestkolera.se/app_top.php?latest', get_questions_factory('latest'));

  $('body')
    .on('click', '.upvote,.downvote', vote_function)
    .on('click', '.show_all', function () {
      $('.latestQuestions tr:not(.hide,.head)').remove();
      $(this).remove();
      $.get('http://pestkolera.se/app_top.php?all', get_questions_factory('latest'));
    });
});
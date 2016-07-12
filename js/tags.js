$(document).ready(function() {
  g_tag_hash = (function () {
    var $tag_name_list = $('.js-tag-list').find('h2');
    var $tag_post_list = $('.js-tag-list').find('ul').clone();
    var tag_hash = {};

    for (var i = 0; i < $tag_name_list.length; i++) {
      var tag_name = $tag_name_list.eq(i).text();
      var $single_tag_post_list = $tag_post_list.eq(i).find('li');

      tag_hash[tag_name] = $single_tag_post_list;
    }

    return tag_hash;
  })();


  function updateAllSelectedState(tag_name_list) {
    $('.js-tag-name-list').find('li').each(function(index, element) {
      var $li = $(element);
      if (tag_name_list.indexOf(get_tag_name($li)) > -1) {
        $li.data('selected', 'true');
        $li.addClass('page-tag-name-selected');
      }
    });
  }

  (function initTagList() {
    var tags_string = getURLParameter('names');
    var tag_name_list = [];
    if (tags_string != undefined) {
      tag_name_list = decodeURI(tags_string).split(',');
    }
    updateAllSelectedState(tag_name_list);
    updateTagListDisplay(tag_name_list);
  })();


  function get_tag_name($li) {
    return $li.children('a').clone().children().remove().end().text();
  }

  function get_tag_name_list() {
    var tag_name_list = [];
    $('.js-tag-name-list').find('li').each(function(index, element) {
      $li = $(element);
      if ($li.data('selected') == 'true') {
        tag_name_list.push(get_tag_name($li));
      }
    });
    return tag_name_list;
  }


  function intersection_array($arr1, $arr2) {
    var common_list = [];

    for (var i = 0; i < $arr1.length; i++) {
      for (var j = 0; j < $arr2.length; j++) {
        if ($arr1.eq(i).text() == $arr2.eq(j).text()) {
          common_list.push($arr1[i]);
        }
      }
    }

    return $(common_list);
  }

  function get_tag_post_list(tag_name_list) {
    var $tag_post_list = g_tag_hash[tag_name_list[0]];

    if (tag_name_list.length == 1) {
      return $tag_post_list;
    }

    for (var i = 1; i < tag_name_list.length; i++) {
      var $tag_post_list_next = g_tag_hash[tag_name_list[i]];
      $tag_post_list = intersection_array($tag_post_list, $tag_post_list_next);
    }

    return $tag_post_list;
  }


  function display_tag_list(tag_name_list, $tag_post_list) {
    var $tag_list_display = $('.js-tag-list-display');

    if (tag_name_list.length == 0) {
      $tag_list_display.empty();
      return;
    }

    $tag_list_display.empty();
    $tag_list_display.append('<h2>' + tag_name_list.join(' ,') + '</h2>');
    $tag_list_display.append('<ul class="js-tag-post-list-display post-list"></ul>');
    $('.js-tag-post-list-display').append($tag_post_list);
  }


  function updateUrlQuery(key, value_list) {
    if (history.pushState) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      if (value_list.length > 0) {
        newurl = newurl + '?' + key + '=' + encodeURI(value_list.join(','));
      }

      window.history.pushState({path: newurl}, '', newurl);
    }
  }

  function updateSelectedState($e) {
    if ($e.data('selected') == 'true') {
      $e.data('selected', 'false');
      $e.removeClass('page-tag-name-selected');
    } else {
      $e.data('selected', 'true');
      $e.addClass('page-tag-name-selected');
    }
  }

  function updateTagListDisplay(tag_name_list) {
    display_tag_list(tag_name_list, get_tag_post_list(tag_name_list));
  }

  function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) {
        return sParameterName[1];
      }
    }
  }


  $('.js-tag-name-list ul li').click(function() {
    updateSelectedState($(this));

    var tag_name_list = get_tag_name_list();

    updateTagListDisplay(tag_name_list);

    updateUrlQuery('names', tag_name_list);
  });
});

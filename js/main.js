/**
 * Nav menu
 */
function isMenuActivate() {
  return document.getElementById('js-nav-menu-icon-activate').style.display == 'block';
}

function activateMenu() {
  document.getElementById('js-nav-menu-trigger').style.display = 'block';
  document.getElementById('js-nav-menu-icon').style.display = 'none';
  document.getElementById('js-nav-menu-icon-activate').style.display = 'block';
}

function cancelActivateMenu() {
  document.getElementById('js-nav-menu-trigger').style.display = 'none';
  document.getElementById('js-nav-menu-icon').style.display = 'block';
  document.getElementById('js-nav-menu-icon-activate').style.display = 'none';
}

function toggleMenu() {
  var isActivate = isMenuActivate();
  if (isActivate) {
    cancelActivateMenu();
  } else {
    activateMenu();
  }
}

document.getElementById('js-nav-menu-icon').addEventListener('click', toggleMenu);
document.getElementById('js-nav-menu-icon-activate').addEventListener('click', toggleMenu);



/**
 * pre tag
 */
function countLines(element) {
  return element.innerHTML.split('\n').length
}

function hiddenLineForhighlight(element) {
  element.getElementsByClassName('gutter')[0].style.display = 'none';

  pre_list = element.getElementsByTagName('pre');
  last_pre = pre_list[pre_list.length - 1];
  last_pre.classList.add('no-line-number');
}

function hiddenLineForShortPre() {
  var highlight_list = document.getElementsByClassName('highlight');
  for (var i = 0; i < highlight_list.length; i++) {
    lines = countLines(highlight_list[i].getElementsByTagName('pre')[0]);
    if (lines <= 1) {
      hiddenLineForhighlight(highlight_list[i]);
    }
  }
}

hiddenLineForShortPre();


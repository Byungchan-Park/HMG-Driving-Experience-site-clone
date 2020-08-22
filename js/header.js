'use strict'

var header = document.getElementById('header')
var gnbBtn = document.querySelector('.btnGnb')
var gnb = document.getElementById('gnb') // gnb 버튼 눌렀을 때 닫기 버튼으로 바뀌고, 다시 눌렀을 때 열기 버튼으로 바뀐다.
var activeBtn = document.querySelector('.activeBtn')
var shareWrapper = document.querySelector('.share-wrapper')
var gnbBox = document.querySelector('#gnb > nav > ul')
var subMenu = document.querySelectorAll('#gnb > nav > ul > li > ul')
var bottomMenu = document.querySelector('#gnb > ul')

var isClicked = false
var anchor
var totalHeight = 0

// 이벤트 위임 이용
gnbBox.addEventListener('click', function (event) {
  var gnbBoxHeight = window.getComputedStyle(gnbBox).height.replace('px', '')
  anchor = event.target.closest('a')
  if (!anchor) return
  if (!gnbBox.contains(anchor)) return
  showSubmenu(anchor)

  if (getGnbmenuHeight() > gnbBoxHeight) {
    gnbBox.style.overflowY = 'auto'
  } else {
    gnbBox.style.overflowY = 'hidden'
  }
  totalHeight = 0
})

function showSubmenu(anchor) {
  var listHeight = parseFloat(window.getComputedStyle(anchor.parentNode).height.replace('px', ''))
  var subMenuHeight = getAbsoluteHeight(anchor.nextSibling.nextSibling)
  if (listHeight === 60) {
    anchor.parentNode.style.height = listHeight + subMenuHeight + 'px'
  } else {
    anchor.parentNode.style.height = '60px'
  }
}
function getAbsoluteHeight(el) {
  var styles = window.getComputedStyle(el)
  var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom'])

  return Math.ceil(el.offsetHeight + margin)
}

function getGnbmenuHeight() {
  var gnbMenu_list = document.querySelectorAll('#gnb > nav > ul > li')
  var gnbMenu_array = Array.prototype.slice.call(gnbMenu_list)
  var numMenu = gnbMenu_array.length
  for (var i = 0; i < numMenu; i++) {
    var currentHeight = gnbMenu_list[i].style.height.replace('px', '') || parseFloat(window.getComputedStyle(gnbMenu_list[i]).height.replace('px', ''))
    totalHeight += Number(currentHeight)
  }
  return totalHeight
}

gnbBtn.addEventListener('click', showGnb)

activeBtn.addEventListener('click', function () {
  showShareItems()
})

function showGnb() {
  gnbBtn.classList.toggle('btnClose')
  header.classList.toggle('on')
  document.body.classList.toggle('gnb-active')

  if (header.className === 'on') {
    // works for the pc version
    header.addEventListener('transitionend', function () {
      gnb.className = 'show'
    })
  } else {
    gnb.className = undefined
  }
}

function showShareItems() {
  if (!isClicked) {
    shareWrapper.classList.add('clicked')
    activeBtn.setAttribute('title', '닫기')
    isClicked = true
  } else {
    shareWrapper.classList.remove('clicked')
    activeBtn.setAttribute('title', '열기')
    isClicked = false
  }
}

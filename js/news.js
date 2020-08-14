'use strict'

var swiperWrap = document.querySelector('.swiper-wrapper')
var swiper = document.querySelectorAll('.swiper-wrapper div')
var prevBtn = document.querySelector('#news p.control a.btnPrev')
var pauseBtn = document.querySelector('#news p.control a.btnPause')
var nextBtn = document.querySelector('#news p.control a.btnNext')
var playBtn = document.querySelector('#news p.control a.btnPlay')
var width = window.getComputedStyle(swiper[0]).width.replace('px', '')
var margin = window.getComputedStyle(swiper[1]).marginLeft.replace('px', '')
var outerWidth = Number(width) + Number(margin)
var newsCount = 0
var positionChange = 0
var timerId2 = ''
var isTimerOn2 = true
var timerSpeed2 = 3000

showNews()
isWholeWidth()

window.addEventListener('resize', function () {
  isWholeWidth()
  width = window.getComputedStyle(swiper[0]).width.replace('px', '')
  margin = window.getComputedStyle(swiper[1]).marginLeft.replace('px', '')
  outerWidth = Number(width) + Number(margin)
})
prevBtn.addEventListener('click', function () {
  showNews('prevBtn')
})
nextBtn.addEventListener('click', function () {
  showNews('nextBtn')
})
pauseBtn.addEventListener('click', function () {
  if (isTimerOn2 === true) {
    this.classList.add('off')
    playBtn.classList.add('on')
    clearInterval(timerId2)
    isTimerOn2 = false
  }
})
playBtn.addEventListener('click', function () {
  if (isTimerOn2 === false) {
    this.classList.remove('on')
    pauseBtn.classList.remove('off')
    isTimerOn2 = true
    showNews()
  }
})

function showNews() {
  clearInterval(timerId2)
  swiperWrap.style.transition = '0.3s'
  positionChange = outerWidth * newsCount

  if (arguments[0] === 'prevBtn') {
    if (newsCount > 1 && positionChange <= 0) {
      prevBtn.setAttribute('disabled', true)
      newsCount = 0 // 첫번째 뉴스가 보이면 더이상 왼쪽 방향으로 이동하지 않는다.
    } else {
      prevBtn.setAttribute('disabled', false)
      newsCount > 0 && newsCount-- // 첫번째 뉴스가 보이기 전까지는 위치가 이동한다.
    }
  }

  if (arguments[0] === 'nextBtn') {
    if (positionChange >= Number(swiperWrap.style.width.replace('px', '')) - outerWidth - Number(width)) {
      nextBtn.setAttribute('disabled', true) // 마지막 뉴스가 보이면 더이상 오른쪽 방향으로 이동하지 않는다.
    } else {
      nextBtn.setAttribute('disabled', false)
      newsCount++ // 마지막 뉴스가 보이기 전까지는 위치가 이동한다.
    }
  }

  swiperWrap.style.transform = 'translate3d(-' + outerWidth * newsCount + 'px, 0, 0)'
  swiperWrap.style['-ms-transform'] = 'translate(-' + outerWidth * newsCount + 'px, 0)' // ie9 대응

  if (isTimerOn2 === true) {
    timerId2 = setInterval(function () {
      newsCount++

      if (positionChange >= Number(swiperWrap.style.width.replace('px', '')) - outerWidth - Number(width)) {
        newsCount = 0
      }

      showNews()
    }, timerSpeed2)
  }
}

function isWholeWidth() {
  var widthSum = 0
  var marginSum = 0
  var marginLeftProp = ''
  var widthProp = ''

  for (var i = 0; i < swiper.length; i++) {
    widthProp = window.getComputedStyle(swiper[i]).width.replace('px', '')
    widthSum += Number(widthProp)
    marginLeftProp = window.getComputedStyle(swiper[i]).marginLeft.replace('px', '')

    if (marginLeftProp) {
      marginSum += Number(marginLeftProp)
    }
  }

  swiperWrap.style.width = widthSum + marginSum + 'px'
}

'use strict'

var swiperWrap = document.querySelector('.swiper-wrapper')
var swiperElems = document.querySelectorAll('.swiper-wrapper div')
var prevBtn = document.querySelector('#news p.control a.btnPrev')
var pauseBtn = document.querySelector('#news p.control a.btnPause')
var nextBtn = document.querySelector('#news p.control a.btnNext')
var playBtn = document.querySelector('#news p.control a.btnPlay')
var indicator = document.querySelector('#indicator') // it exists only in mobile version
var width = window.getComputedStyle(swiperElems[0]).width.replace('px', '')
var margin = window.getComputedStyle(swiperElems[1]).marginLeft.replace('px', '')
var outerWidth = parseFloat(width) + parseFloat(margin)
var newsCount = 0
var positionChange = 0
var lastNewsNum = swiperElems.length - 1
var timerId2 = ''
var isTimerOn2 = true
var timerSpeed2 = 3000

makeIndicator(indicator, swiperElems.length) // only with mobile version works
showNews()
isWholeWidth()

window.addEventListener('resize', function () {
  isWholeWidth()
  width = window.getComputedStyle(swiperElems[0]).width.replace('px', '')
  margin = window.getComputedStyle(swiperElems[1]).marginLeft.replace('px', '')
  outerWidth = parseFloat(width) + parseFloat(margin)
})

prevBtn.addEventListener('click', function () {
  newsCount--
  newsCount = Math.max(newsCount, 0)
  showNews()
})
nextBtn.addEventListener('click', function () {
  newsCount++
  newsCount = Math.min(newsCount, lastNewsNum)
  showNews()
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

// for a mobile version
// each indicator button works when clicks
// shows each news
for (let i = 0; i < indicator.childNodes.length; i++) {
  var indicatorBtn = indicator.childNodes[i].childNodes[0]
  indicatorBtn.addEventListener('click', function (event) {
    event.preventDefault()
    newsCount = i
    showNews()
  })
}

function showNews() {
  clearInterval(timerId2)
  swiperWrap.style.transition = '0.3s'
  positionChange = outerWidth * newsCount

  swiperWrap.style.transform = 'translate3d(-' + positionChange + 'px, 0, 0)'
  swiperWrap.style['-ms-transform'] = 'translate(-' + positionChange + 'px, 0)' // ie9 대응

  prevBtn.disabled = positionChange === 0
  nextBtn.disabled = positionChange === outerWidth * lastNewsNum

  for (let i = 0; i < indicator.childNodes.length; i++) {
    if (newsCount === i) {
      indicator.childNodes[i].className = 'active'
    } else {
      indicator.childNodes[i].className = ''
    }
  }

  if (isTimerOn2 === true) {
    timerId2 = setInterval(function () {
      newsCount++
      newsCount = Math.min(newsCount, lastNewsNum)
      if (newsCount === lastNewsNum) newsCount = 0
      showNews()
    }, timerSpeed2)
  }
}

function isWholeWidth() {
  var widthSum = 0
  var marginSum = 0
  var marginLeftProp = ''
  var widthProp = ''

  for (var i = 0; i < swiperElems.length; i++) {
    widthProp = window.getComputedStyle(swiperElems[i]).width.replace('px', '')
    widthSum += Number(widthProp)
    marginLeftProp = window.getComputedStyle(swiperElems[i]).marginLeft.replace('px', '')

    if (marginLeftProp) {
      marginSum += Number(marginLeftProp)
    }
  }

  swiperWrap.style.width = widthSum + marginSum + 'px'
}

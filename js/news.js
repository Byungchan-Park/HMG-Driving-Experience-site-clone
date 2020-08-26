'use strict'

var swiperWrap = document.querySelector('.swiper-wrapper')
var swiperContainer = document.querySelector('.swiper-container')
var swiperElems = document.querySelectorAll('.swiper-wrapper div')
var controlBox = document.querySelector('#news p.control')
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

controlBox.addEventListener('click', function (event) {
  var target = event.target.closest('a')

  if (!target) return
  if (!controlBox.contains(target)) return

  switch (target.className) {
    case 'btnPrev':
      handlePrevBtn()
      break
    case 'btnNext':
      handleNextBtn()
      break
    case 'btnPause':
      handlePauseBtn()
      break
    case 'btnPlay':
      handlePlayBtn()
      break
  }

  event.preventDefault()
})
swiperWrap.addEventListener('mousedown', function (event) {})

function handlePrevBtn() {
  newsCount--
  newsCount = Math.max(newsCount, 0)
  showNews()
}

function handleNextBtn() {
  newsCount++
  newsCount = Math.min(newsCount, lastNewsNum)
  showNews()
}

function handlePauseBtn() {
  if (isTimerOn2 === true) {
    pauseBtn.classList.add('off')
    playBtn.classList.add('on')
    clearInterval(timerId2)
    isTimerOn2 = false
  }
}

function handlePlayBtn() {
  if (isTimerOn2 === false) {
    playBtn.classList.remove('on')
    pauseBtn.classList.remove('off')
    isTimerOn2 = true
    showNews()
  }
}

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

swipeNewsSection(swiperContainer)

function swipeNewsSection(selector) {
  var startX = 0
  var delX = 0
  var offsetX = 0

  selector.addEventListener('mousedown', function (e) {
    e.preventDefault()
    swiperWrap.style.transition = 'none'
    clearTimeout(timerID)
    startX = e.clientX
    offsetX = positionChange
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  })

  function handleMouseMove(e) {
    delX = e.clientX - startX
    if ((newsCount === 0 && delX > 0) || (newsCount === lastNewsNum && delX < 0)) {
      // delX > 0 : 오른쪽 방향으로 넘길 때, delX < 0 : 왼쪽 방향으로 넘길 때
      delX = delX / 10
      // 본인의 변화량보다 10분의 1만 움직이게!!!
    }
    swiperWrap.style.transform = 'translate3d(' + (delX - offsetX) + 'px, 0, 0)'
  }
  function handleMouseUp() {
    if (delX < -50 && newsCount !== lastNewsNum - 1) {
      newsCount++
      showNews()
    } else if (delX > 50 && newsCount !== 0) {
      newsCount--
      showNews()
    } else {
      showNews()
    }
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
}

function isWholeWidth() {
  var widthSum = 0
  var marginSum = 0
  var marginLeftProp = ''
  var widthProp = ''

  for (var i = 0; i < swiperElems.length; i++) {
    widthProp = window.getComputedStyle(swiperElems[i]).width.replace('px', '')
    widthSum += parseFloat(widthProp)
    marginLeftProp = window.getComputedStyle(swiperElems[i]).marginLeft.replace('px', '')

    if (marginLeftProp) {
      marginSum += parseFloat(marginLeftProp)
    }
  }

  swiperWrap.style.width = widthSum + marginSum + 'px'
}

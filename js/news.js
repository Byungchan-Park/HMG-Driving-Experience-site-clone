'use strict'

const swiperWrap = document.querySelector('.swiper-wrapper')
const swiper = document.querySelectorAll('.swiper-wrapper div')
const prevBtn = document.querySelector('#news p.control a.btnPrev')
const pauseBtn = document.querySelector('#news p.control a.btnPause')
const nextBtn = document.querySelector('#news p.control a.btnNext')
const playBtn = document.querySelector('#news p.control a.btnPlay')
let width = window.getComputedStyle(swiper[0]).width.replace('px', '')
let margin = window.getComputedStyle(swiper[1]).marginLeft.replace('px', '')
let outerWidth = Number(width) + Number(margin)
let newsCount = 0
let positionChange = 0
let timerId2 = ''
let isTimerOn2 = true
let timerSpeed2 = 3000

showNews()
isWholeWidth()
window.addEventListener('resize', isWholeWidth)

prevBtn.addEventListener('click', function (event) {
  event.preventDefault()
  showNews('prevBtn')
})
nextBtn.addEventListener('click', function (event) {
  event.preventDefault()
  showNews('nextBtn')
})
pauseBtn.addEventListener('click', function (event) {
  event.preventDefault()
  if (isTimerOn2 === true) {
    this.classList.add('off')
    playBtn.classList.add('on')
    clearInterval(timerId2)
    isTimerOn2 = false
  }
})
playBtn.addEventListener('click', function (event) {
  event.preventDefault()
  if (isTimerOn2 === false) {
    console.log(positionChange)
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
      newsCount = 0
      // 첫번째 뉴스가 보이면 더이상 왼쪽 방향으로 이동하지 않는다.
    } else {
      prevBtn.setAttribute('disabled', false)
      newsCount > 0 && newsCount--
      // 첫번째 뉴스가 보이기 전까지는 위치가 이동한다.
    }
  }
  if (arguments[0] === 'nextBtn') {
    console.log(positionChange)
    if (positionChange >= Number(swiperWrap.style.width.replace('px', '')) - outerWidth - Number(width)) {
      nextBtn.setAttribute('disabled', true)
      // 마지막 뉴스가 보이면 더이상 오른쪽 방향으로 이동하지 않는다.
    } else {
      nextBtn.setAttribute('disabled', false)
      newsCount++
      // 마지막 뉴스가 보이기 전까지는 위치가 이동한다.
    }
  }
  swiperWrap.style.transform = `translate3d(-${outerWidth * newsCount}px, 0, 0)`

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
  let widthSum = 0
  let marginSum = 0
  let marginLeftProp = ''
  let widthProp = ''
  swiper.forEach((ele) => {
    widthProp = window.getComputedStyle(ele).width.replace('px', '')
    widthSum += Number(widthProp)
  })
  swiper.forEach((ele) => {
    marginLeftProp = window.getComputedStyle(ele).marginLeft.replace('px', '')
    if (marginLeftProp) {
      marginSum += Number(marginLeftProp)
    }
  })
  swiperWrap.style.width = `${widthSum + marginSum}px`
}

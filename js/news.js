'use strict'

const swiperWrap = document.querySelector('.swiper-wrapper')
const swiper = document.querySelectorAll('.swiper-wrapper div')
const prevBtn = document.querySelector('#news p.control a.prev')
const pauseBtn = document.querySelector('#news p.control a.pause')
const nextBtn = document.querySelector('#news p.control a.next')
let width = window.getComputedStyle(swiper[0]).width.replace('px', '')
let margin = window.getComputedStyle(swiper[1]).marginLeft.replace('px', '')
let outerWidth = Number(width) + Number(margin)
let newsCount = 0

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

function showNews(btnName) {
  swiperWrap.style.transition = '0.3s'
  let positionChange = outerWidth * newsCount
  if (btnName === 'prevBtn') {
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
  if (btnName === 'nextBtn') {
    if (positionChange >= Number(swiperWrap.style.width.replace('px', '')) - outerWidth) {
      nextBtn.setAttribute('disabled', true)
      // 마지막 뉴스가 보이면 더이상 오른쪽 방향으로 이동하지 않는다.
    } else {
      nextBtn.setAttribute('disabled', false)
      newsCount++
      // 마지막 뉴스가 보이기 전까지는 위치가 이동한다.
    }
  }
  swiperWrap.style.transform = `translate3d(-${outerWidth * newsCount}px, 0, 0)`

  console.log(newsCount)
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

var swiperWrap = document.querySelector('.swiper-wrapper')
var swiper = document.querySelectorAll('.swiper-wrapper div')
var prevBtn = document.querySelector('#news p.control a.btnPrev')
var nextBtn = document.querySelector('#news p.control a.btnNext')
var width = window.getComputedStyle(swiper[0]).width.replace('px', '')
var margin = window.getComputedStyle(swiper[1]).marginLeft.replace('px', '')
var outerWidth = parseFloat(width) + parseFloat(margin)
var count = 1

var swiperElems = swiperWrap.querySelectorAll('div')

var position = 0

isWholeWidth()

nextBtn.addEventListener('click', function () {
  position -= outerWidth * count
  position = Math.max(position, -outerWidth * (swiperElems.length - count - 1))
  this.disabled = position === -outerWidth * (swiperElems.length - count - 1)
  swiperWrap.style.transition = '0.4s'
  swiperWrap.style.transform = 'translate3d(' + position + 'px, 0, 0)'
})

prevBtn.addEventListener('click', function () {
  position += outerWidth * count
  position = Math.min(position, 0)
  this.disabled = position === 0
  swiperWrap.style.transition = '0.4s'
  swiperWrap.style.transform = 'translate3d(' + position + 'px, 0, 0)'
})

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

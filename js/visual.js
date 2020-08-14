'use strict'

var slideContainer = document.querySelector('.slide-container')
var firstSlide = document.getElementById('first-slide')
var firstItemClone = slideContainer.firstElementChild.cloneNode(true)
var lastItemClone = slideContainer.lastElementChild.cloneNode(true)

slideContainer.insertBefore(lastItemClone, firstSlide)
slideContainer.appendChild(firstItemClone)

var slides = document.querySelectorAll('.slide')
var indicator = document.querySelectorAll('li.line')
var visualPrevBtn = document.querySelector('.prev')
var visualStopBtn = document.querySelector('.pause')
var visualNextBtn = document.querySelector('.next')
var slideNumber = document.querySelector('.control-box .stateBar .numBox em')
var currentSlide = 0
var nextSlide = 0
var prevSlide = 0
var slideCount = slides.length
var timerID = ''
var isTimerOn = true // false이면 타이머가 꺼진 상태로 돌리겠다. true이면 타이머가 켜진 상태로 돌리겠다.
var timerSpeed = 3000

// 슬라이드가 있으면 가로로 배열하기
for (var i = 0; i < slideCount; i++) {
  slides[i].style.left = i * 100 + '%'
}

if (isTimerOn === true) {
  visualStopBtn.classList.remove('play')
  visualStopBtn.classList.add('pause')
} else {
  visualStopBtn.classList.remove('pause')
  visualStopBtn.classList.add('play')
}

showSlide(1) // 초기 슬라이드 상태 설정

visualPrevBtn.addEventListener('click', function () {
  showSlide(prevSlide)
})
visualNextBtn.addEventListener('click', function () {
  showSlide(nextSlide)
})
visualStopBtn.addEventListener('click', function () {
  changeBtnAction()
})

function showSlide(n) {
  clearTimeout(timerID)
  slideContainer.style.transition = '0.3s'
  slideContainer.style.left = n * -100 + '%'

  for (var i = 0; i < indicator.length; i++) {
    indicator[i].classList.remove('on')

    if (n === 0) {
      indicator[4].classList.add('on')
    } else if (n === 6) {
      indicator[0].classList.add('on')
    } else if (i === n - 1) {
      indicator[i].classList.add('on')
    }
  }

  slideNumber.innerHTML = n === 0 ? 5 : n === 6 ? 1 : n
  currentSlide = n
  nextSlide = n >= slideCount - 1 ? 2 : n + 1
  prevSlide = n <= 0 ? 4 : n - 1 // about prevBtn which moves from the first slide to last slide naturally

  if (currentSlide === 0) {
    slideContainer.addEventListener('transitionend', moveToLast)
  } else {
    slideContainer.removeEventListener('transitionend', moveToLast)
  } // about nextBtn which moves from the last slide to fist slide naturally

  if (currentSlide === slideCount - 1) {
    slideContainer.addEventListener('transitionend', moveToFirst)
  } else {
    slideContainer.removeEventListener('transitionend', moveToFirst)
  }

  if (isTimerOn === true) {
    timerID = setTimeout(function () {
      showSlide(nextSlide)
    }, timerSpeed)
  }
}
function moveToLast() {
  slideContainer.style.transition = '0s'
  slideContainer.style.left = '-500%'
}
function moveToFirst() {
  slideContainer.style.transition = '0s'
  slideContainer.style.left = '-100%'
}

function changeBtnAction() {
  if (isTimerOn === true) {
    visualStopBtn.classList.remove('pause')
    visualStopBtn.classList.add('play')
    clearTimeout(timerID)
    isTimerOn = false
  } else {
    visualStopBtn.classList.remove('play')
    visualStopBtn.classList.add('pause')
    timerID = setTimeout(function () {
      showSlide(nextSlide)
    }, timerSpeed)
    isTimerOn = true
  }
}

'use strict'

const slideContainer = document.querySelector('.slide-container')
const firstSlide = document.getElementById('first-slide')
const firstItemClone = slideContainer.firstElementChild.cloneNode(true)
const lastItemClone = slideContainer.lastElementChild.cloneNode(true)
slideContainer.insertBefore(lastItemClone, firstSlide)
slideContainer.appendChild(firstItemClone)
const slides = document.querySelectorAll('.slide')
const indicator = document.querySelectorAll('li.line')
const visualPrevBtn = document.querySelector('.prev')
const visualStopBtn = document.querySelector('.pause')
const visualNextBtn = document.querySelector('.next')
let slideNumber = document.querySelector('.control-box .stateBar .numBox em')
let currentSlide = 0
let nextSlide = 0
let prevSlide = 0
let slideCount = slides.length
let timerID = ''
let isTimerOn = true // false이면 타이머가 꺼진 상태로 돌리겠다. true이면 타이머가 켜진 상태로 돌리겠다.
let timerSpeed = 3000

// 슬라이드가 있으면 가로로 배열하기
for (let i = 0; i < slideCount; i++) {
  slides[i].style.left = i * 100 + '%'
}

showSlide(1) // 초기 슬라이드 상태 설정

// 슬라이드 이동 함수
function showSlide(n) {
  clearInterval(timerID)

  slideContainer.style.transition = '0.3s'
  slideContainer.style.left = n * -100 + '%'

  indicator.forEach((line) => line.classList.remove('on'))
  indicator.forEach((line, i) => {
    if (n === 0) {
      indicator[4].classList.add('on')
    } else if (n === 6) {
      indicator[0].classList.add('on')
    } else if (i === n - 1) {
      line.classList.add('on')
    }
  })
  slideNumber.innerHTML = n === 0 ? 5 : n === 6 ? 1 : n

  currentSlide = n
  nextSlide = n >= slideCount - 1 ? 2 : n + 1
  prevSlide = n <= 0 ? 4 : n - 1

  // about prevBtn which moves from the first slide to last slide naturally
  if (currentSlide === 0) {
    slideContainer.addEventListener('transitionend', moveToLast)
  } else {
    slideContainer.removeEventListener('transitionend', moveToLast)
  }

  // about nextBtn which moves from the last slide to fist slide naturally
  if (currentSlide === slideCount - 1) {
    slideContainer.addEventListener('transitionend', moveToFirst)
  } else {
    slideContainer.removeEventListener('transitionend', moveToFirst)
  }

  if (isTimerOn === true) {
    timerID = setInterval(() => {
      showSlide(nextSlide)
    }, timerSpeed)
  }
}

// 버튼을 클릭하면 슬라이드 이동시키기
visualPrevBtn.addEventListener('click', function (event) {
  event.preventDefault()
  showSlide(prevSlide)
})

function moveToLast() {
  slideContainer.style.transition = '0s'
  slideContainer.style.left = '-500%'
}

visualNextBtn.addEventListener('click', function (event) {
  event.preventDefault()
  showSlide(nextSlide)
})

function moveToFirst() {
  slideContainer.style.transition = '0s'
  slideContainer.style.left = '-100%'
}

// 재생 버튼과 일시정지 버튼 전환
visualStopBtn.addEventListener('click', function (event) {
  event.preventDefault()
  // 일시정지 버튼을 누를 때
  if (isTimerOn === true) {
    this.classList.add('play')
    this.classList.remove('pause')
    clearInterval(timerID)
    isTimerOn = false
  } else {
    this.classList.add('pause')
    this.classList.remove('play')
    timerID = setInterval(() => {
      showSlide(nextSlide)
    }, timerSpeed)
    isTimerOn = true
  }
})

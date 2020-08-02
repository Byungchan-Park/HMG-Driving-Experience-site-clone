'use strict'

const slideContainer = document.getElementsByClassName('slide-container')[0]
const slides = document.getElementsByClassName('slides')
const firstSlide = document.getElementById('first-slide')
const lineList = document.getElementsByClassName('line')
const visualPrevBtn = document.getElementsByClassName('prev')[0]
const visualStopBtn = document.getElementsByClassName('pause')[0]
const visualNextBtn = document.getElementsByClassName('next')[0]
let slideNumber = document.querySelector('.control-box .stateBar .numBox em')
let currentIndex = 1
const firstItemClone = slideContainer.firstElementChild.cloneNode(true)
const lastItemClone = slideContainer.lastElementChild.cloneNode(true)

slideContainer.insertBefore(lastItemClone, firstSlide)
slideContainer.appendChild(firstItemClone)
const slideCount = slides.length

// 슬라이드가 있으면 가로로 배열하기
for (let i = 0; i < slideCount; i++) {
  slides[i].style.left = i * 100 + '%'
}

// 슬라이드 이동 함수
function goToSlide(idx) {
  slideContainer.style.transition = '0.3s'
  slideContainer.style.left = (idx + 1) * -100 + '%'
  currentIndex = idx + 1
}
// 버튼을 클릭하면 슬라이드 이동시키기
visualPrevBtn.addEventListener('click', function (event) {
  event.preventDefault()
  console.log(currentIndex) // 1
  // 처음이 아니라면 goToSlide(currentIndex - 1)
  // 처음이라면 goToSlide(???)
  if (currentIndex === 0) {
    slideContainer.style.transition = '0.3s'
    slideContainer.style.left = '0%'
    slideNumber.innerHTML = 5
    setTimeout(() => {
      slideContainer.style.transition = '0s'
      slideContainer.style.left = '-500%'
    }, 301)
    currentIndex = 4
    lineList[0].classList.remove('on')
    lineList[currentIndex].classList.add('on')
  } else {
    slideContainer.style.transition = '0.3s'
    slideContainer.style.left = currentIndex * -100 + '%'
    slideNumber.innerHTML = currentIndex
    lineList[currentIndex].classList.remove('on')
    lineList[currentIndex - 1].classList.add('on')
    currentIndex--
  }
})
visualNextBtn.addEventListener('click', function (event) {
  event.preventDefault()
  console.log(currentIndex) // 1 2 3 4
  // 마지막이 아니라면 goToSlide(currentIndex + 1);
  // 마지막이라면 goToSlide(??);
  if (currentIndex === slideCount - 2) {
    // 4
    slideContainer.style.left = -600 + '%'
    slideNumber.innerHTML = 1
    setTimeout(() => {
      slideContainer.style.transition = '0s'
      slideContainer.style.left = 0
    }, 301)
    lineList[currentIndex - 1].classList.remove('on')
    lineList[0].classList.add('on')
    currentIndex = 1
  } else {
    goToSlide(currentIndex) // -200% -300% -400% -500%
    console.log(currentIndex) // 2 3 4 5
    slideNumber.innerHTML = currentIndex // 2 3 4 5
    if (currentIndex === 2) {
      lineList[0].classList.remove('on')
      lineList[currentIndex - 1].classList.add('on')
    } else {
      lineList[currentIndex - 2].classList.remove('on')
      lineList[currentIndex - 1].classList.add('on')
    }
  }
})

// 슬라이드 자동 전환
let intervalId
function slideShow() {
  intervalId = setInterval(() => {
    slideContainer.style.transition = '0.3s'
    slideContainer.style.left = (currentIndex + 1) * -100 + '%'
    currentIndex++

    // 슬라이드가 이동하면서 슬라이드 숫자 바꾸기
    if (currentIndex === slideCount - 1) {
      slideNumber.innerHTML = 1
      lineList[currentIndex - 2].classList.remove('on')
      lineList[0].classList.add('on')
    } else {
      slideNumber.innerHTML = currentIndex
      if (currentIndex === 2) {
        lineList[0].classList.remove('on')
        lineList[currentIndex - 1].classList.add('on')
      } else {
        lineList[currentIndex - 2].classList.remove('on')
        lineList[currentIndex - 1].classList.add('on')
      }
    }
    if (currentIndex === slideCount - 1) {
      // 다시 첫 번째 슬라이드로 돌아간다.
      setTimeout(() => {
        slideContainer.style.transition = '0s'
        slideContainer.style.left = '-100%'
      }, 301)
      currentIndex = 1
    }
  }, 6000)
}

window.addEventListener('load', () => {
  // 처음 슬라이드 보여주기
  slideContainer.style.left = '-100%'
  // 슬라이드 자동 전환
  slideShow()
})

// 재생 버튼과 일시정지 버튼 전환
visualStopBtn.addEventListener('click', (event) => {
  event.preventDefault()
  // 일시정지 버튼을 누를 때
  if (visualStopBtn.classList.contains('pause')) {
    clearInterval(intervalId)
    visualStopBtn.classList.add('play')
    visualStopBtn.classList.remove('pause')
  } else {
    slideShow()
    visualStopBtn.classList.add('pause')
    visualStopBtn.classList.remove('play')
  }
})

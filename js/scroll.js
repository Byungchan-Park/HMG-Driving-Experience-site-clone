'use strict'

let btt = document.getElementById('back-to-top')
const docElem = document.documentElement
let offset = 0
const docHeight = Math.max(docElem.offsetHeight, docElem.scrollHeight)
const quickMoveBar = document.getElementById('quickMove')
const festivalBg = document.querySelector('#nFestival .background')
const introduction = document.getElementById('introduction')
const drivingAcademy = document.getElementById('drivingAcademy')
const drivingPleasure = document.getElementById('drivingPleasure')
const nFestival = document.getElementById('nFestival')
let scrollPos = 0

function isElementUnderBottom(elem, triggerDiff) {
  const { top } = elem.getBoundingClientRect()
  // elem 의 보이는 영역(viewport)을 시작점으로 위치
  const { innerHeight } = window
  // 뷰포트의 높이
  return top > innerHeight + (triggerDiff || 0)
}
// element가 스크린 아래쪽에 있는지를 검사한다.

function handleScroll() {
  const elems = document.querySelectorAll('.up-on-scroll')
  let seconds = 0.2
  Object.values(elems)
    .filter((elem) => elem.tagName === 'LI')
    .forEach((elem) => {
      elem.style.transitionDelay = `${seconds}s`
      seconds += 0.2
    })
  // #drivingAcademy의 image들 시간차로 화면에 띄우기
  seconds = 0.2
  Object.values(elems)
    .filter((elem) => elem.classList.contains('program'))
    .forEach((elem) => {
      elem.style.transitionDelay = `${seconds}s`
      seconds += 0.2
    })
  // #drivingPleasure의 image들 시간차로 화면에 띄우기

  elems.forEach((elem) => {
    if (isElementUnderBottom(elem, -20)) {
      elem.style.opacity = '0'
      elem.style.transform = 'translateY(70px)'
    } else {
      elem.style.opacity = '1'
      elem.style.transform = 'translateY(0px)'
    }
  })
}

window.addEventListener('scroll', handleScroll)

if (docHeight !== 'undefined') {
  offset = docHeight / 4
}

let zoom = 0.66

window.addEventListener('scroll', () => {
  scrollPos = docElem.scrollTop
  btt.className = scrollPos > offset ? 'visible' : ''
  // 스크롤 이벤트에 따라 quickMoveBar 이미지 변경
  if (scrollPos < 1200) {
    quickMoveBar.setAttribute('data-section', 'section1')
  } else if (scrollPos > 1200 && scrollPos < 2600) {
    quickMoveBar.setAttribute('data-section', 'section2')
  } else if (scrollPos > 2600 && scrollPos < 3900) {
    quickMoveBar.setAttribute('data-section', 'section3')
  } else if (scrollPos > 3900) {
    quickMoveBar.setAttribute('data-section', 'section4')
  }
})
btt.addEventListener('click', (event) => {
  event.preventDefault()
  scrollToTop()
})

function scrollToTop() {
  let scrollInterval = setInterval(() => {
    if (scrollPos !== 0) {
      window.scrollBy(0, -55)
    } else {
      clearInterval(scrollInterval)
    }
  }, 15)
}

// Save a current position in global
window.__scrollPosition = document.documentElement.scrollTop || 0

document.addEventListener('scroll', function () {
  let _documentY = document.documentElement.scrollTop
  let _direction = _documentY - window.__scrollPosition >= 0 ? 1 : -1
  window.__scrollPosition = _documentY // Update scrollY

  if (_documentY > 3800 && _documentY < 4700) {
    if (_direction > 0) {
      festivalBg.style.width = `${100 + zoom}%`
      zoom += 0.66
    } else {
      if (festivalBg.style.width.replace('%', '') > 100) {
        festivalBg.style.width = `${100 + zoom}%`
        zoom -= 0.44
      }
      // 배경 이미지가 100%보다 작아질 때는 더이상 축소되지 않는다.
      // 배경 이미지의 최소 너비는 항상 100%를 유지한다.
    }
  }
})

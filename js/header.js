'use strict'

const gnbBtn = document.querySelector('.btnGnb')
const header = document.getElementById('header')

// gnb 버튼 눌렀을 때 닫기 버튼으로 바뀌고, 다시 눌렀을 때 열기 버튼으로 바뀐다.
gnbBtn.addEventListener('click', (event) => {
  event.preventDefault()
  gnbBtn.classList.toggle('btnClose')
  header.classList.toggle('on')
})

let last_known_scroll_position = 0
let ticking = false

function doSomething(scroll_pos) {
  scroll_pos !== 0 ? header.classList.add('down') : header.classList.remove('down')
}

window.addEventListener('scroll', function (e) {
  last_known_scroll_position = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(last_known_scroll_position)
      ticking = false
    })

    ticking = true
  }
})

// activeBtn 누를 때 title이 닫기로 바뀐다.
const activeBtn = document.querySelector('.activeBtn')
const shareWrapper = document.querySelector('.share-wrapper')
let isClicked = false
activeBtn.addEventListener('click', function (event) {
  event.preventDefault()
  if (!isClicked) {
    shareWrapper.classList.add('clicked')
    activeBtn.setAttribute('title', '닫기')
    isClicked = true
  } else {
    shareWrapper.classList.remove('clicked')
    activeBtn.setAttribute('title', '열기')
    isClicked = false
  }
})

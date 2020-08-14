'use strict'

var gnbBtn = document.querySelector('.btnGnb')
var gnb = document.getElementById('gnb') // gnb 버튼 눌렀을 때 닫기 버튼으로 바뀌고, 다시 눌렀을 때 열기 버튼으로 바뀐다.
var activeBtn = document.querySelector('.activeBtn')
var shareWrapper = document.querySelector('.share-wrapper')

var isClicked = false

gnbBtn.addEventListener('click', showGnb)

activeBtn.addEventListener('click', function () {
  showShareItems()
})

function showGnb() {
  gnbBtn.classList.toggle('btnClose')
  header.classList.toggle('on')

  if (header.className === 'on') {
    header.addEventListener('transitionend', function () {
      gnb.className = 'show'
    })
  } else {
    gnb.className = undefined
  }
}

function showShareItems() {
  if (!isClicked) {
    shareWrapper.classList.add('clicked')
    activeBtn.setAttribute('title', '닫기')
    isClicked = true
  } else {
    shareWrapper.classList.remove('clicked')
    activeBtn.setAttribute('title', '열기')
    isClicked = false
  }
}

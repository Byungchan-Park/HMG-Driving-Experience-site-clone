(function () {
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
  var newsNum = 0
  var positionChange = 0
  var lastNewsNum = window.innerWidth < 850 ? swiperElems.length : swiperElems.length - 2
  var timerId = ''
  var isTimerOn = true
  var timerSpeed = 3000

  function showNews() {
    var numIndicatorElems = indicator.childNodes.length;

    clearInterval(timerId)
    swiperWrap.style.transition = '0.3s'
    positionChange = outerWidth * newsNum

    swiperWrap.style.transform = 'translate3d(-' + positionChange + 'px, 0, 0)'
    swiperWrap.style['-ms-transform'] = 'translate(-' + positionChange + 'px, 0)'

    prevBtn.disabled = positionChange === 0
    nextBtn.disabled = positionChange === outerWidth * lastNewsNum

    for (var i = 0; i < numIndicatorElems; i++) {
      if (newsNum === i) {
        indicator.childNodes[i].className = 'active'
      } else {
        indicator.childNodes[i].className = ''
      }
    }

    // if (isTimerOn === true) {
    //   timerId = setInterval(function () {
    //     newsNum++
    //     newsNum = Math.min(newsNum, lastNewsNum)
    //     if (newsNum === lastNewsNum) newsNum = 0
    //     showNews()
    //   }, timerSpeed)
    // }
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
  function handlePrevBtn() {
    newsNum--
    newsNum = Math.max(newsNum, 0)
    showNews()
  }
  function handleNextBtn() {
    newsNum++
    newsNum = Math.min(newsNum, lastNewsNum)
    showNews()
  }
  function handlePauseBtn() {
    if (isTimerOn === true) {
      pauseBtn.classList.add('off')
      playBtn.classList.add('on')
      clearInterval(timerId)
      isTimerOn = false
    }
  }
  function handlePlayBtn() {
    if (isTimerOn === false) {
      pauseBtn.classList.remove('off')
      playBtn.classList.remove('on')
      timerId = setInterval(function () {
        newsNum++
        newsNum = Math.min(newsNum, lastNewsNum)
        if (newsNum === lastNewsNum) newsNum = 0
        showNews()
      }, timerSpeed)
      isTimerOn = true
    }
  }
  function swipeNewsSection(selector) {
    var startX = 0
    var delX = 0
    var offsetX = 0

    selector.addEventListener('mousedown', function (e) {
      e.preventDefault()
      swiperWrap.style.transition = 'none'
      clearTimeout(timerId)
      startX = e.clientX
      offsetX = positionChange
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    })

    function handleMouseMove(e) {
      delX = e.clientX - startX
      if ((newsNum === 0 && delX > 0) || (newsNum === lastNewsNum && delX < 0)) {
        // delX > 0 : 오른쪽 방향으로 넘길 때, delX < 0 : 왼쪽 방향으로 넘길 때
        delX = delX / 10
        // 본인의 변화량보다 10분의 1만 움직이게!!!
      }
      swiperWrap.style.transform = 'translate3d(' + (delX - offsetX) + 'px, 0, 0)'
    }
    function handleMouseUp() {
      if (delX < -50 && newsNum !== lastNewsNum - 1) {
        newsNum++
        showNews()
      } else if (delX > 50 && newsNum !== 0) {
        newsNum--
        showNews()
      } else {
        showNews()
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }

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
    event.preventDefault()
    var target = (function () {
      if (Element.prototype.closest) {
        return event.target.closest('a')
      } else {
        if (event.target.parentNode.nodeName === 'A') return event.target.parentNode
      }
    })()
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
      case 'btnPlay on':
        handlePlayBtn()
        break
    }
  })
  // for a mobile version
  // each indicator button works when clicks
  // shows each news
  indicator.addEventListener('click', function (event) {
    event.preventDefault()
    if (event.target.tagName !== 'A') return
    var indicatorBtn = event.target
    for (var i = 0; i < indicator.childNodes.length; i++) {
      if (indicatorBtn === indicator.childNodes[i].childNodes[0]) {
        newsNum = i
        showNews()
      }
    }
  })
  swipeNewsSection(swiperContainer)
})();






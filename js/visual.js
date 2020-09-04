(function () {
  var slideContainer = document.querySelector('.slide-container')
  var visualPrevBtn = document.querySelector('.prev')
  var visualStopBtn = document.querySelector('.pause')
  var visualNextBtn = document.querySelector('.next')
  var slideNumber = document.querySelector('.control-box .stateBar .numBox em')
  var mainIndicator = document.querySelector('ul.indicator.pc')
  var firstSlide = document.getElementById('first-slide')
  var firstItemClone = slideContainer.firstElementChild.cloneNode(true)
  var lastItemClone = slideContainer.lastElementChild.cloneNode(true)
  slideContainer.insertBefore(lastItemClone, firstSlide)
  slideContainer.appendChild(firstItemClone)
  var slides = document.querySelectorAll('.slide')
  var currentSlide = 0
  var nextSlide = 0
  var prevSlide = 0
  var slideCount = slides.length
  var timerID = ''
  var isTimerOn = true
  var timerSpeed = 3000

  function swipeVisualSection(selector) {
    var startX = 0
    var delX = 0
    var offsetX = 0

    selector.addEventListener('mousedown', function (e) {
      e.preventDefault()
      this.style.transition = 'none'
      clearTimeout(timerID)
      startX = e.clientX
      offsetX = this.style.left
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    })

    function handleMouseMove(e) {
      delX = e.clientX - startX
      var leftSum = offsetX + delX
      selector.style.left = 'calc(' + leftSum + 'px)'
    }
    function handleMouseUp() {
      if (delX < -200) {
        showSlide(nextSlide)
      } else if (delX > 200) {
        showSlide(prevSlide)
      } else {
        showSlide(currentSlide)
      }
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }
  function showSlide(n) {
    clearTimeout(timerID)
    slideContainer.style.transition = '0.3s'
    slideContainer.style.left = n * -100 + '%'

    for (var i = 0; i < slideCount - 2; i++) {
      mainIndicatorBar[i].classList.remove('on')

      if (n === 6) {
        mainIndicatorBar[0].classList.add('on')
      } else if (i === n - 1) {
        mainIndicatorBar[i].classList.add('on')
      }
    }

    slideNumber.innerHTML = n === 0 ? 5 : n === 6 ? 1 : n

    currentSlide = n
    nextSlide = n >= slideCount - 1 ? 2 : n + 1
    prevSlide = n <= 0 ? 4 : n - 1

    if (currentSlide === 0) {
      slideContainer.addEventListener('transitionend', moveToLast)
    } else {
      slideContainer.removeEventListener('transitionend', moveToLast)
    }

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

  for (var i = 0; i < slideCount; i++) {
    slides[i].style.left = i * 100 + '%'
  }
  makeIndicator(mainIndicator, slideCount - 2)
  var mainIndicatorBar = mainIndicator.querySelectorAll('li')
  if (isTimerOn === true) {
    visualStopBtn.classList.remove('play')
    visualStopBtn.classList.add('pause')
  } else {
    visualStopBtn.classList.remove('pause')
    visualStopBtn.classList.add('play')
  }
  showSlide(1)

  visualPrevBtn.addEventListener('click', function () {
    showSlide(prevSlide)
  })
  visualNextBtn.addEventListener('click', function () {
    showSlide(nextSlide)
  })
  visualStopBtn.addEventListener('click', function () {
    changeBtnAction()
  })
  swipeVisualSection(slideContainer)
})();





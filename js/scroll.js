(function () {
  var header = document.getElementById('header')
  var moveToTopBtn = document.getElementById('back-to-top')
  var docElem = document.documentElement
  var sectionMoveBarContainer = document.querySelector('#quickMove')
  var sectionMoveBar = document.querySelector('#quickMove ol.sectionMoveBar')
  var zoom = 0.66
  var scrollPosPrev = 0

  var scrollEffect = {
    changeHeaderBg: function (scrollPos) {
      scrollPos ? header.classList.add('down') : header.classList.remove('down')
    },
    showElementUp: function () {
      var elems = document.querySelectorAll('.up-on-scroll')
      var seconds = 0.2
      var elemsArray = []

      for (var i = 0; i < elems.length; i++) {
        elemsArray.push({
          index: i,
          tagName: elems[i].nodeName,
          classNames: elems[i].className,
        })
      }

      elemsArray
        .filter(function (elem) {
          return elem.tagName === 'LI'
        })
        .forEach(function (elem) {
          elems[elem.index].style.transitionDelay = seconds + 's'
          seconds += 0.2
        }) // #drivingAcademy의 image들 시간차로 화면에 띄우기

      seconds = 0.2

      elemsArray
        .filter(function (elem) {
          return elem.classNames.indexOf('program') !== -1
        })
        .forEach(function (elem) {
          elems[elem.index].style.transitionDelay = seconds + 's'
          seconds += 0.2
        }) // #drivingPleasure의 image들 시간차로 화면에 띄우기

      elemsArray.forEach(function (elem) {
        var domElement = elems[elem.index]

        if (!isElementUnderBottom(domElement, -20)) {
          // 브라우저의 화면 상에서 docElement가 보인다면,
          domElement.classList.add('show')
        }
      })

      // 요소가 브라우저 화면의 아래에 위치하는지 판단하는 함수
      function isElementUnderBottom(elem, triggerDiff) {
        return elem.getBoundingClientRect().top > window.innerHeight + (triggerDiff || 0)
      }
      // element가 스크린 아래쪽에 있는지를 검사한다.
    },
    changeBarStatus: function (scrollPosCurrent) {
      var quickMoveBar = document.querySelector('#quickMove')
      var sectionElems = document.querySelectorAll('.scroll-page')
      var numSectionElems = sectionElems.length
      var sectionPositions = []
      for (var i = 0; i < numSectionElems; i++) {
        var absoluteTop = Math.floor(window.pageYOffset + sectionElems[i].getBoundingClientRect().top - sectionElems[i].offsetHeight / 2)
        sectionPositions.push(absoluteTop)
      }
      if (scrollPosCurrent < sectionPositions[1]) {
        quickMoveBar.setAttribute('data-section', 'section1')
      } else if (scrollPosCurrent < sectionPositions[2]) {
        quickMoveBar.setAttribute('data-section', 'section2')
      } else if (scrollPosCurrent < sectionPositions[3]) {
        quickMoveBar.setAttribute('data-section', 'section3')
      } else if (scrollPosCurrent > sectionPositions[3]) {
        quickMoveBar.setAttribute('data-section', 'section4')
      }
    },
    showBttBtn: function (scrollPosCurrent) {
      var docHeight = Math.max(docElem.offsetHeight, docElem.scrollHeight)
      var offset = 0

      if (docHeight !== 'undefined') {
        offset = docHeight / 4
      }

      moveToTopBtn.className = scrollPosCurrent > offset ? 'visible' : '' // 스크롤 이벤트에 따라 quickMoveBar 이미지 변경
    },
    backToTop: function () {
      var scrollInterval = setInterval(function () {
        if (window.pageYOffset !== 0) {
          window.scrollBy(0, -55)
        } else {
          clearInterval(scrollInterval)
        }
      }, 15)
    },
    controlBg: function (scrollPosCurrent, direction) {
      var festivalBg = document.querySelector('#nFestival .background')

      if (scrollPosCurrent > 3800 && scrollPosCurrent < 4700) {
        if (direction > 0) {
          festivalBg.style.width = 100 + zoom + '%'
          zoom += 0.66
        } else {
          var bgWidth = festivalBg.style.width.replace('%', '')
          if (bgWidth > 100) {
            festivalBg.style.width = 100 + zoom + '%'
            zoom -= 0.44
          } // 배경 이미지가 100%보다 작아질 때는 더이상 축소되지 않는다.
          // 배경 이미지의 최소 너비는 항상 100%를 유지한다.
        }
      }
    },
  }

  window.addEventListener('scroll', function () {
    var scrollPosCurrent = docElem.scrollTop || window.scrollY
    var direction = scrollPosCurrent - scrollPosPrev > 0 ? 1 : -1

    scrollPosPrev = scrollPosCurrent

    if (window.innerWidth > 850) {
      scrollEffect.showElementUp()
      scrollEffect.changeBarStatus(scrollPosCurrent)
      scrollEffect.showBttBtn(scrollPosCurrent)
      scrollEffect.controlBg(scrollPosCurrent, direction)
    }
    scrollEffect.changeHeaderBg(scrollPosCurrent)
  })

  moveToTopBtn.addEventListener('click', function (event) {
    event.preventDefault()
    scrollEffect.backToTop(scrollPosPrev)
  })

  sectionMoveBar.addEventListener('click', function (e) {
    var target = (function () {
      if (Element.prototype.closest) {
        return e.target.closest('a')
      } else {
        if (e.target.parentNode.nodeName === 'A') return e.target.parentNode
      }
    })()
    var sectionElems = document.querySelectorAll('.scroll-page')
    var sections = ['#visual', '#drivingAcademy', '#drivingPleasure', '#nFestival']

    function calculateSectionTopPos() {
      var numSectionElems = sectionElems.length
      var sectionPositionTop = []
      for (var i = 0; i < numSectionElems; i++) {
        var sectionElem = sectionElems[i];
        var absoluteTop = Math.floor(window.pageYOffset + sectionElem.getBoundingClientRect().top)
        sectionPositionTop.push(absoluteTop)
      }
      return sectionPositionTop;
    }
    function moveToSection() {
      sections.forEach(function (section, i) {
        if (section === target.getAttribute('href')) {
          window.scrollTo(0, sectionPositionTop[i])
          sectionMoveBarContainer.setAttribute('data-section', 'section' + i + 1)
        }
      })
    }

    if (!target) return
    if (!this.contains(target)) return
    var sectionPositionTop = calculateSectionTopPos()
    moveToSection()
  })
})();
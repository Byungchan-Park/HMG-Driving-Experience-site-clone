var anchor = document.getElementsByTagName('a')

function preventEventAnchor(event) {
  event.preventDefault()
}
function makeIndicator(selector, count) {
  for (var i = 0; i < count; i++) {
    var li = document.createElement('li')
    var anchor = document.createElement('a')
    var text = document.createTextNode(i + 1 + '번째 슬라이드')
    anchor.setAttribute('href', '#')
    anchor.className = 'hidden'
    anchor.appendChild(text)
    li.appendChild(anchor)
    selector.appendChild(li)
  }
}

for (var i = 0; i < anchor.length; i++) {
  anchor[i].addEventListener('click', function (event) {
    preventEventAnchor(event)
  })
}



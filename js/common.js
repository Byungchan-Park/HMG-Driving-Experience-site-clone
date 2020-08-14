var anchor = document.getElementsByTagName('a')

for (var i = 0; i < anchor.length; i++) {
  anchor[i].addEventListener('click', function (event) {
    preventEventAnchor(event)
  })
}

function preventEventAnchor(event) {
  event.preventDefault()
}

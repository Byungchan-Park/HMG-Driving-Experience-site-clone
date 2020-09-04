(function () {
  var program = document.querySelectorAll('ul.program-list li')
  var button = document.querySelectorAll('.mobileClick')
  var numPrograms = program.length

  for (var i = 0; i < numPrograms; i++) {
    button[i].addEventListener('click', function () {
      this.parentNode.classList.toggle('active')
    })
  }
})()



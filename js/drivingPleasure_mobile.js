var program = document.querySelectorAll('ul.program-list li')
var button = document.querySelectorAll('.mobileClick')

for (var i = 0; i < program.length; i++) {
  button[i].addEventListener('click', function () {
    program[i].classList.toggle('active')
  })
}

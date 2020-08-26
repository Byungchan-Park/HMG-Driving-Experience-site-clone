'use strict'

function hoverEffectCanvas(e, n) {
  function i(e) {
    r.clearRect(0, 0, o, s)
    r.beginPath()
    r.arc(d, h, p, b, e, !1)
    r.stroke()
    g++
    u + 1 > g &&
      (c = requestAnimationFrame(function () {
        i((f * g) / 30 + b)
      }))
  }

  if (((a = e), 0 == document.querySelectorAll('#' + e).length)) return !1
  var a,
    t = document.getElementById(a),
    o = t.width,
    s = t.height,
    r = t.getContext('2d'),
    l = r.createLinearGradient(0, 0, 0, 50)
  l.addColorStop('0', '#ff8833')
  l.addColorStop('1', '#e11111')
  r.lineWidth = 2
  r.strokeStyle = l
  r.shadowOffsetX = 0
  r.shadowOffsetY = 0
  r.shadowBlur = 2
  r.shadowColor = '#e11111'
  var c,
    d = o / 2,
    h = s / 2,
    p = n,
    f = 2 * Math.PI,
    b = Math.PI / -2,
    u = 100,
    g = 0
  t.addEventListener('mouseover', function () {
    i()
  })
  t.addEventListener('mouseout', function () {
    cancelAnimationFrame(c)
    g = 0
    r.clearRect(0, 0, o, s)
  })
}

if (window.innerWidth > 850) {
  hoverEffectCanvas('btnVisualPrev', 30)
  hoverEffectCanvas('btnVisualNext', 30)
  hoverEffectCanvas('btnVisualPause', 30)
  hoverEffectCanvas('btnShare', 29)
  hoverEffectCanvas('btnShareFacebook', 29)
  hoverEffectCanvas('btnShareKakaotalk', 29)
  hoverEffectCanvas('btnShareLink', 29)
  hoverEffectCanvas('btnGnb', 29)
}

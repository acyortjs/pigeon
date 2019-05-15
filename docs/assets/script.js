class Query {
  constructor(dom) {
    this.dom = typeof dom === 'string'
      ? document.querySelector(dom)
      : dom
  }

  addClass(name) {
    this.dom.classList.add(name)
    return this
  }

  removeClass(name) {
    this.dom.classList.remove(name)
    return this
  }

  toggleClass(name) {
    this.dom.classList.toggle(name)
  }

  on(e, f) {
    this.dom.addEventListener(e, f)
  }

  off(e) {
    this.dom.removeEventListener(e)
  }

  css(key, value) {
    this.dom.style[key] = value
  }
}

const $ = dom => new Query(dom)

document.addEventListener('DOMContentLoaded', function ready() {
  $('.menu > span').on('click', () => {
    $(this).toggleClass('active')
    $('.menu > div').toggleClass('active')
  })

  if (window.location.pathname !== '/') {
    $('.menu > a').css('display', 'block')
  }
})

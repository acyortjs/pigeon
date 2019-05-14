class Query {
  constructor(dom) {
    this.dom = document.querySelector(dom)
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
}

const $ = dom => new Query(dom)

document.addEventListener('DOMContentLoaded', () => {
  $('.menu > span').on('click', () => {
    $('.menu > span').toggleClass('active')
    $('.menu > div').toggleClass('active')
  })
})

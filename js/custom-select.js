'use strict';

// Custom select modul START
// Use export default class CustomSelect
class CustomSelect {
  constructor(node) {
    this.node = node
    this.id = node.getAttribute('data-id') || null
    this.header = node.querySelector('.js-header')
    this.title = node.querySelector('.js-title')
    // this.options = Array.from(node.querySelectorAll('.js-option')) // ES6
    this.options = Array.prototype.slice.call(node.querySelectorAll('.js-option')) // ES5
    this.input = node.querySelector('.js-input')
    this.opened = false

    this.init()
  }

  init() {
    this.change(this.input.value)
    this.events()
  }

  change(value) {
    if(!this.options) {
      return false
    }

    let active_option = this.options[0]

    if (value) {
      active_option = this.options.filter(el => {
        return el.getAttribute('data-value') === value
      })[0]

      this.node.classList.remove('error')
    } else {
      value = active_option.getAttribute('data-value')
    }

    if (this.title && active_option) {
      this.title.textContent = active_option.getAttribute('data-title')
    }

    if (this.input) {
      this.input.value = value
    }

    this.close()
  }

  toggle() {
    this.opened ? this.close() : this.open()
  }

  open() {
    this.node.classList.add("opened")
    this.opened = true
  }

  close() {
    this.node.classList.remove("opened")
    this.opened = false
  }

  events() {
    this.constructor.on(this.header, 'click', (e) => {
      e.preventDefault()
      this.toggle()
    })

    this.constructor.forEachArr(this.options, (item) => {
      this.constructor.on(item, 'click', (e) => {
        e.preventDefault()
        this.change(e.target.getAttribute('data-value'))
      })
    })
  }

  static forEachArr (arr, callback) {
    for (let i = 0; i < arr.length; i+=1) {
      callback(arr[i], arr, i)
    }
  }

  static on (elem, event, func) {
    if (elem.addEventListener) {
      elem.addEventListener(event, func)
    } else {
      elem.attachEvent('on' + event, func)
    }
  }
}
// Custom select modul END

let selects_data = []
let selects_nodes = document.getElementsByClassName('js-custom-select')
  
//init and push instance to array
for (let i = 0; i < selects_nodes.length; i+=1) {
  let el = selects_nodes[i]

  selects_data.push({
    'name': el.getAttribute('data-id') || null,
    'instance': new CustomSelect(el)
  })
}

//click on d ocument - close select
document.addEventListener('click', (e) => {
  let target = e.target

  if ( !target.classList.contains('js-custom-select') && !target.closest('.js-custom-select') ) {
    for (let i = 0; i < selects_data.length; i+=1) {
      selects_data[i]['instance'].close()
    }
  }
})
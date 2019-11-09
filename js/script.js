'use strict';

//custom select start
import CustomSelect from './custom-select'
// const CustomSelect = require('./custom-select.js')

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
//custom select end
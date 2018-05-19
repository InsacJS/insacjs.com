const _ = require('lodash')

module.exports = (data) => {

  const _cap = data.file
  const cap = _.camelCase(_cap)
  const Cap = _.upperFirst(cap)

  let result = ``

  result += `// libreries
import { Component } from '@angular/core';

@Component({
  selector    : 'app-${_cap}',
  templateUrl : './${_cap}.component.html',
  styleUrls   : ['./${_cap}.component.scss']
})
export class ${Cap}Component {
  constructor () {}

  ngOnInit() {}
}`

  return result
}

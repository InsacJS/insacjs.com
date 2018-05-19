const _ = require('lodash')

module.exports = (data) => {

  const _cap = data.file
  const cap = _.camelCase(_cap)
  const Cap = _.upperFirst(cap)

  let result = ``

  result += `import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { ${Cap}Component } from './${_cap}.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: ${Cap}Component }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class ${Cap}Routes { }
`

  return result
}

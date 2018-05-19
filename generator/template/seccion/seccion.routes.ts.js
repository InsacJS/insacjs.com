const _ = require('lodash')

module.exports = (data) => {

  const _section = data.folder
  const section = _.camelCase(_section)
  const Section = _.upperFirst(section)
  let routes = ``

  for (let i in data.capitulos) {
    const _cap  = data.capitulos[i].file
    const cap = _.camelCase(_cap)
    const Cap = _.upperFirst(cap)
    routes += `      { path: '${_cap}', loadChildren: './${_cap}/${_cap}.module#${Cap}Module' },\n`
  }

  let result = ``
  result += `// Modules
import { RouterModule, Routes } from '@angular/router';
import { NgModule }             from '@angular/core';
// Components
import { ${Section}Component } from './${_section}.component';

const ROUTES: Routes = [
  {
    path        : '',
    component   : ${Section}Component,
    children    : [
${routes}    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class ${Section}Routes {}
`
  return result
}

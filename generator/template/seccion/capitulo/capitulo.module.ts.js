const _ = require('lodash')

module.exports = (data) => {

  const _cap = data.file
  const cap = _.camelCase(_cap)
  const Cap = _.upperFirst(cap)

  let result = ``

  result += `// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { ${Cap}Routes }      from './${_cap}.routes';
// Components
import { ${Cap}Component } from './${_cap}.component';

@NgModule({
  imports: [
    ${Cap}Routes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ${Cap}Component
  ],
  providers: []
})
export class ${Cap}Module {}
`

  return result
}

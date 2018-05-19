const _ = require('lodash')

module.exports = (data) => {
  const _section = data.folder
  const section = _.camelCase(_section)
  const Section = _.upperFirst(section)

  let result = `// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { MaterialModule }      from '../../material.module';
import { ${Section}Routes } from './${_section}.routes';
// Components
import { ${Section}Component } from './${_section}.component';

@NgModule({
  imports: [
    CommonModule,
    ${Section}Routes,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ${Section}Component
  ],
  providers: []
})
export class ${Section}Module {}
`
  return result
}

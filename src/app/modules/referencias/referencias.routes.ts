// Modules
import { RouterModule, Routes } from '@angular/router';
import { NgModule }             from '@angular/core';
// Components
import { ReferenciasComponent } from './referencias.component';

const ROUTES: Routes = [
  {
    path        : '',
    component   : ReferenciasComponent,
    children    : [
      { path: 'insac-cli', loadChildren: './insac-cli/insac-cli.module#InsacCliModule' },
      { path: 'field-creator', loadChildren: './field-creator/field-creator.module#FieldCreatorModule' },
      { path: 'apidoc-creator', loadChildren: './apidoc-creator/apidoc-creator.module#ApidocCreatorModule' },
      { path: 'input-data-validator', loadChildren: './input-data-validator/input-data-validator.module#InputDataValidatorModule' },
      { path: 'sequelize-options', loadChildren: './sequelize-options/sequelize-options.module#SequelizeOptionsModule' },
      { path: 'response-handler', loadChildren: './response-handler/response-handler.module#ResponseHandlerModule' },
      { path: 'seed-creator', loadChildren: './seed-creator/seed-creator.module#SeedCreatorModule' },
    ]
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
export class ReferenciasRoutes {}

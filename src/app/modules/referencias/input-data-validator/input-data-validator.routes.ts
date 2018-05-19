import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { InputDataValidatorComponent } from './input-data-validator.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: InputDataValidatorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class InputDataValidatorRoutes { }

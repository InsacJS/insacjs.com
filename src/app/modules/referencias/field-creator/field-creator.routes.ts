import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { FieldCreatorComponent } from './field-creator.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: FieldCreatorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class FieldCreatorRoutes { }

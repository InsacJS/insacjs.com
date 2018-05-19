import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { ApidocCreatorComponent } from './apidoc-creator.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: ApidocCreatorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class ApidocCreatorRoutes { }

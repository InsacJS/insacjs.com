import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { IntroduccionComponent } from './introduccion.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: IntroduccionComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class IntroduccionRoutes { }

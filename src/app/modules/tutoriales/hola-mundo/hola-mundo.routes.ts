import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { HolaMundoComponent } from './hola-mundo.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: HolaMundoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class HolaMundoRoutes { }

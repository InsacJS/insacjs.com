import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { EstructuraDeProyectoComponent } from './estructura-de-proyecto.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: EstructuraDeProyectoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class EstructuraDeProyectoRoutes { }

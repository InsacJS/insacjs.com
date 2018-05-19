import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { MiPrimerProyectoComponent } from './mi-primer-proyecto.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: MiPrimerProyectoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class MiPrimerProyectoRoutes { }

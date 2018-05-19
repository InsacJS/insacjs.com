// Modules
import { RouterModule, Routes } from '@angular/router';
import { NgModule }             from '@angular/core';
// Components
import { TutorialesComponent } from './tutoriales.component';

const ROUTES: Routes = [
  {
    path        : '',
    component   : TutorialesComponent,
    children    : [
      { path: 'introduccion', loadChildren: './introduccion/introduccion.module#IntroduccionModule' },
      { path: 'estructura-de-proyecto', loadChildren: './estructura-de-proyecto/estructura-de-proyecto.module#EstructuraDeProyectoModule' },
      { path: 'hola-mundo', loadChildren: './hola-mundo/hola-mundo.module#HolaMundoModule' },
      { path: 'mi-primer-proyecto', loadChildren: './mi-primer-proyecto/mi-primer-proyecto.module#MiPrimerProyectoModule' },
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
export class TutorialesRoutes {}

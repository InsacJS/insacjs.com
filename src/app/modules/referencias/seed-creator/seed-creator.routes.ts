import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { SeedCreatorComponent } from './seed-creator.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: SeedCreatorComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class SeedCreatorRoutes { }

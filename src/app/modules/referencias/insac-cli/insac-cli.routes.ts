import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { InsacCliComponent } from './insac-cli.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: InsacCliComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class InsacCliRoutes { }

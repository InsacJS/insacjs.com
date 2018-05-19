import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { SequelizeOptionsComponent } from './sequelize-options.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: SequelizeOptionsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class SequelizeOptionsRoutes { }

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { ResponseHandlerComponent } from './response-handler.component';
// Routes
const ROUTES: Routes = [
  { path: '', component: ResponseHandlerComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class ResponseHandlerRoutes { }

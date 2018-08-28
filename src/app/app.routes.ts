// Modules
import { RouterModule, Routes } from '@angular/router'
import { NgModule }             from '@angular/core'
// Components
import { IndexComponent }         from './pages/index/index.component'
import { NotFoundComponent }      from './pages/not-found/not-found.component'

const APP_ROUTES: Routes = [
  { path: 'doc', loadChildren: './modules/doc/doc.module#DocModule' },
  { path: '', component: IndexComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutes {}

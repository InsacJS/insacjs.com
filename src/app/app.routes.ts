// Modules
import { RouterModule, Routes } from '@angular/router'
import { NgModule }             from '@angular/core'
// Components
import { IndexComponent }         from './pages/index/index.component'
import { NotFoundComponent }      from './pages/not-found/not-found.component'

const APP_ROUTES: Routes = [
  { path: 'tutoriales', loadChildren: './modules/tutoriales/tutoriales.module#TutorialesModule' },
  { path: 'referencias', loadChildren: './modules/referencias/referencias.module#ReferenciasModule' },
  { path: 'index', component: IndexComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
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

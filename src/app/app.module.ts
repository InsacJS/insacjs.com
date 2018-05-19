// Modules
import { FormsModule, ReactiveFormsModule }    from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserModule }              from '@angular/platform-browser'
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations'
import { NgModule }                   from '@angular/core'
import { MaterialModule }             from './material.module'
import { AppRoutes }                  from './app.routes'
// Components
import { AppComponent }           from './app.component'
import { IndexComponent }         from './pages/index/index.component'
import { NotFoundComponent }      from './pages/not-found/not-found.component'

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NotFoundComponent,
  ],
  imports: [
    AppRoutes,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

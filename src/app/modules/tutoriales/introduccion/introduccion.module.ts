// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { IntroduccionRoutes }      from './introduccion.routes';
// Components
import { IntroduccionComponent } from './introduccion.component';

@NgModule({
  imports: [
    IntroduccionRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    IntroduccionComponent
  ],
  providers: []
})
export class IntroduccionModule {}

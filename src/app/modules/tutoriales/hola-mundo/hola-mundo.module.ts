// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { HolaMundoRoutes }      from './hola-mundo.routes';
// Components
import { HolaMundoComponent } from './hola-mundo.component';

@NgModule({
  imports: [
    HolaMundoRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    HolaMundoComponent
  ],
  providers: []
})
export class HolaMundoModule {}

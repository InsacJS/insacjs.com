// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { EstructuraDeProyectoRoutes }      from './estructura-de-proyecto.routes';
// Components
import { EstructuraDeProyectoComponent } from './estructura-de-proyecto.component';

@NgModule({
  imports: [
    EstructuraDeProyectoRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    EstructuraDeProyectoComponent
  ],
  providers: []
})
export class EstructuraDeProyectoModule {}

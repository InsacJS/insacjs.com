// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { MiPrimerProyectoRoutes }      from './mi-primer-proyecto.routes';
// Components
import { MiPrimerProyectoComponent } from './mi-primer-proyecto.component';

@NgModule({
  imports: [
    MiPrimerProyectoRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    MiPrimerProyectoComponent
  ],
  providers: []
})
export class MiPrimerProyectoModule {}

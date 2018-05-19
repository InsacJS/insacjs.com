// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { MaterialModule }      from '../../material.module';
import { ReferenciasRoutes } from './referencias.routes';
// Components
import { ReferenciasComponent } from './referencias.component';

@NgModule({
  imports: [
    CommonModule,
    ReferenciasRoutes,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ReferenciasComponent
  ],
  providers: []
})
export class ReferenciasModule {}

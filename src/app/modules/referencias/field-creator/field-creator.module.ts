// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { FieldCreatorRoutes }      from './field-creator.routes';
// Components
import { FieldCreatorComponent } from './field-creator.component';

@NgModule({
  imports: [
    FieldCreatorRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    FieldCreatorComponent
  ],
  providers: []
})
export class FieldCreatorModule {}

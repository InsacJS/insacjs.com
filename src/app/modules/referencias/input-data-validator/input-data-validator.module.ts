// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { InputDataValidatorRoutes }      from './input-data-validator.routes';
// Components
import { InputDataValidatorComponent } from './input-data-validator.component';

@NgModule({
  imports: [
    InputDataValidatorRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    InputDataValidatorComponent
  ],
  providers: []
})
export class InputDataValidatorModule {}

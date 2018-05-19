// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { InsacCliRoutes }      from './insac-cli.routes';
// Components
import { InsacCliComponent } from './insac-cli.component';

@NgModule({
  imports: [
    InsacCliRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    InsacCliComponent
  ],
  providers: []
})
export class InsacCliModule {}

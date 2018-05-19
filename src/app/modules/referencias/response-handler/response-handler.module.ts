// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { ResponseHandlerRoutes }      from './response-handler.routes';
// Components
import { ResponseHandlerComponent } from './response-handler.component';

@NgModule({
  imports: [
    ResponseHandlerRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ResponseHandlerComponent
  ],
  providers: []
})
export class ResponseHandlerModule {}

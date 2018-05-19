// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { ApidocCreatorRoutes }      from './apidoc-creator.routes';
// Components
import { ApidocCreatorComponent } from './apidoc-creator.component';

@NgModule({
  imports: [
    ApidocCreatorRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    ApidocCreatorComponent
  ],
  providers: []
})
export class ApidocCreatorModule {}

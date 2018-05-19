// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { MaterialModule }      from '../../material.module';
import { TutorialesRoutes } from './tutoriales.routes';
// Components
import { TutorialesComponent } from './tutoriales.component';

@NgModule({
  imports: [
    CommonModule,
    TutorialesRoutes,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    TutorialesComponent
  ],
  providers: []
})
export class TutorialesModule {}

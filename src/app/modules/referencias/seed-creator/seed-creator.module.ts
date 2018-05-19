// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { SeedCreatorRoutes }      from './seed-creator.routes';
// Components
import { SeedCreatorComponent } from './seed-creator.component';

@NgModule({
  imports: [
    SeedCreatorRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    SeedCreatorComponent
  ],
  providers: []
})
export class SeedCreatorModule {}

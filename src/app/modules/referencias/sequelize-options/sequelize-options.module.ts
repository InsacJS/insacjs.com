// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { MaterialModule }  from '../../../material.module';
import { SequelizeOptionsRoutes }      from './sequelize-options.routes';
// Components
import { SequelizeOptionsComponent } from './sequelize-options.component';

@NgModule({
  imports: [
    SequelizeOptionsRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    SequelizeOptionsComponent
  ],
  providers: []
})
export class SequelizeOptionsModule {}

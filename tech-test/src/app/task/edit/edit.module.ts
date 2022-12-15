import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { TaskFormModule } from '../../shared/modules/task-form/task-form.module';


@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    SharedModule,
    EditRoutingModule,
    TaskFormModule,
  ]
})
export class EditModule { }

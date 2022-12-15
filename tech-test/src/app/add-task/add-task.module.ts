import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { EditRoutingModule } from './add-task-routing.module';
import { AddTaskComponent } from './add-task.component';
import { TaskFormModule } from '../shared/modules/task-form/task-form.module';


@NgModule({
  declarations: [
    AddTaskComponent
  ],
  imports: [
    SharedModule,
    EditRoutingModule,
    TaskFormModule,
  ]
})
export class AddTaskModule { }

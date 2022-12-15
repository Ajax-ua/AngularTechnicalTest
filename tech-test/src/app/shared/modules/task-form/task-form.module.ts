import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

import { TaskFormComponent } from './task-form.component';

@NgModule({
  declarations: [TaskFormComponent],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    FlexLayoutModule,
    RouterModule,
  ],
  exports: [TaskFormComponent],
})
export class TaskFormModule { }

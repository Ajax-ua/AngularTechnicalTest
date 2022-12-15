import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TaskService } from 'src/app/core/services';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  task$: Observable<Task> = this.taskService.selectedTask$;

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {

  }

}

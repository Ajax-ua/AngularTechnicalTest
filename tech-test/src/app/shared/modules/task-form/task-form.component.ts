import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TaskService } from 'src/app/core/services';
import { Task } from '../../models';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit, OnDestroy {
  @Input() task: Task = {} as Task;

  private subscriptions: Subscription[] = [];
  private isEdit: boolean;
  private saveTaskEvent$: Subject<void> = new Subject();

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isEdit = !!this.task?.id;
    this.subscriptions.push(
      this.saveTaskEvent$.pipe(
        switchMap(() => {
          return this.isEdit ? this.taskService.updateTask(this.task) : this.taskService.addTask(this.task);
        }),
      ).subscribe(task => {
        const navTo: string = this.isEdit ? `/task/${task.id}` : '/';
        this.router.navigate([navTo]);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  onToggleChange(event) {
    if (event.checked) {
      const date = new Date();
      this.task.done = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    } else {
      this.task.done = false;
    }
  }

  save() {
    this.saveTaskEvent$.next();
  }
}

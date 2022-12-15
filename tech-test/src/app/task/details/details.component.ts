import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { TaskService } from 'src/app/core/services';
import { Task } from '../../shared/models/task.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private removeTaskEvent$: Subject<number> = new Subject();

  task$: Observable<Task> = this.taskService.selectedTask$;

  constructor(
    private taskService: TaskService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.removeTaskEvent$.pipe(
        switchMap((taskId) => this.taskService.removeTask(taskId)),
      ).subscribe(task => {
        this.router.navigate(['/']);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  remove(taskId: number) {
    this.removeTaskEvent$.next(taskId);
  }

}

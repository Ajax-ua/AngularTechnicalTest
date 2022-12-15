import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, BehaviorSubject, combineLatest, Subscription, Subject } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { TaskService } from '../core/services/task.service';
import { Task } from '../shared/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private tasks$: BehaviorSubject<Task[]> = this.taskService.tasks$;
  private doneFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  private subscriptions: Subscription[] = [];
  private saveTaskEvent$: Subject<Task> = new Subject();
  private removeTaskEvent$: Subject<number> = new Subject();

  doneFilter: boolean = null;
  filteredTasks$: Observable<Task[]> = combineLatest([
    this.tasks$,
    this.doneFilter$.pipe(distinctUntilChanged()),
  ]).pipe(
    map(([tasks, doneFilter]) => {
      if (doneFilter === null) {
        return tasks;
      }

      return tasks.filter(task => !!task.done === doneFilter);
    }),
  );

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.saveTaskEvent$.pipe(
        switchMap((task) => this.taskService.updateTask(task)),
      ).subscribe(),

      this.removeTaskEvent$.pipe(
        switchMap((taskId) => this.taskService.removeTask(taskId)),
      ).subscribe(),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => res.unsubscribe());
  }

  filter(doneFilter: boolean): void {
    this.doneFilter = doneFilter;
    this.doneFilter$.next(doneFilter);
  }

  trackByFn(index: number, item: Task) {
    return item.id.toString() + item.done;
  }

  onChange({ checked: isDone }, task) {
    if (!!task.done === isDone) {
      return;
    }

    if (isDone) {
      const date = new Date();
      task.done = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    } else {
      task.done = false;
    }

    this.saveTaskEvent$.next(task);
  }

  removeTask(task: Task) {
    this.removeTaskEvent$.next(task.id);
  }
}

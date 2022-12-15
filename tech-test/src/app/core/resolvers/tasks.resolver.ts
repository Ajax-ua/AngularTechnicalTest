import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { Task } from 'src/app/shared/models';
import { TaskService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class TasksResolver implements Resolve<Task[]> {
  constructor(
    private taskService: TaskService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Task[]> {
    return this.taskService.loadTasks().pipe(
      filter(res => !!res),
      first(),
    );
  }
}

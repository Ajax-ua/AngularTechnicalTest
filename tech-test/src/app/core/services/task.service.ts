import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Task } from 'src/app/shared/models';
import { ApplicationService } from './application.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$: BehaviorSubject<Task[]> = new BehaviorSubject(null);
  selectedTask$: BehaviorSubject<Task> = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private applicationService: ApplicationService,
  ) { }

  loadTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('tasks').pipe(
      tap(this.tasks$),
    );
  }

  loadTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`tasks/${id}`).pipe(
      tap(this.selectedTask$),
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.patch<Task>(`tasks/${task.id}`, task).pipe(
      tap(() => {
        this.applicationService.showToastr('Saved successfully');

        const tasks = this.tasks$.value;
        let t = tasks.find(({id}) => id === task.id);
        t = task;
        this.tasks$.next(tasks);
      }),
    );
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.httpClient.post<Task>(`tasks`, task).pipe(
      tap(() => {
        this.applicationService.showToastr('Created successfully');
      }),
    );
  }

  removeTask(taskId: number) {
    return this.httpClient.delete(`tasks/${taskId}`).pipe(
      tap(() => {
        this.applicationService.showToastr('Removed successfully');
        const tasks = this.tasks$.value;
        this.tasks$.next(tasks.filter(t => t.id !== taskId));
      }),
    );
  }
}

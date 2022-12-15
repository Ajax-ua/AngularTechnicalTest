import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TaskService } from './task.service';
import { ApplicationService } from '.';

describe('TaskService', () => {
  let service: TaskService;
  let httpController: HttpTestingController;
  const mockedTasks = [
    {
      "id": 1,
      "label": "Kitchen Cleanup",
      "description": "Clean my dirty kitchen",
      "category": "house",
      "done": false
    },
    {
      "id": 2,
      "label": "Taxes",
      "description": "Start doing my taxes and contact my accountant jhon for advice",
      "category": "bureaucracy",
      "done": "22-10-2019"
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: ApplicationService,
        useValue: { showToastr: () => undefined },
      }],
    });
    service = TestBed.inject(TaskService);
    service.tasks$.next(mockedTasks);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks for loadTasks()', () => {
    service.tasks$.next(null);
    service.loadTasks().subscribe((res) => {
      expect(res).toEqual(mockedTasks);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `tasks`,
    });

    req.flush(mockedTasks);

    expect(service.tasks$.value.length).toBe(mockedTasks.length);
  });

  it('should return task for loadTask()', () => {
    const task = mockedTasks[0];
    service.loadTask(task.id).subscribe((res) => {
      expect(res).toEqual(task);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `tasks/${task.id}`,
    });

    req.flush(task);
  });

  it('should return updated task for updateTask()', () => {
    const task = mockedTasks[0];
    const updatedTask = { ...task, label: 'test' };
    service.updateTask(updatedTask).subscribe((res) => {
      expect(res).toEqual(updatedTask);
    });

    const req = httpController.expectOne({
      method: 'PATCH',
      url: `tasks/${task.id}`,
    });

    req.flush(updatedTask);
  });

  it('should return added task for addTask()', () => {
    const newTask = { label: 'test', done: false, description: 'test description' };
    service.addTask(newTask).subscribe((res) => {
      expect(res).toEqual({...newTask, id: 3});
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `tasks`,
    });

    req.flush({...newTask, id: 3});
  });

  it('should return removed task for removeTask()', () => {
    const task = mockedTasks[0];
    service.removeTask(task.id).subscribe((res) => {
      expect(res).toEqual(task);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `tasks/${task.id}`,
    });

    req.flush(task);

    expect(service.tasks$.value.length).toBe(1);
  });
});

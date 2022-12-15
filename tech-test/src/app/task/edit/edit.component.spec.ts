import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { TaskService } from 'src/app/core/services';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () => {
    const taskServiceStub: Partial<TaskService> = {};
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      providers: [
        {provide: TaskService, useValue: taskServiceStub},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

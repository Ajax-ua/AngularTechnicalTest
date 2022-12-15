import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of, BehaviorSubject } from 'rxjs';

import { DetailsComponent } from './details.component';
import { TaskService } from 'src/app/core/services';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let taskServiceStub: Partial<TaskService>;

  beforeEach(async () => {
    taskServiceStub = {
      selectedTask$: new BehaviorSubject(null),
      removeTask: () => of(null),
    };

    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {provide: TaskService, useValue: taskServiceStub},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

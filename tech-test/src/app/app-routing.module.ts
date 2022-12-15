import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', loadChildren: () => import('./list/list.module').then(m => m.ListModule),
  },
  {
    path: 'task/:id', loadChildren: () => import('./task/task.module').then(m => m.TaskModule)
  },
  {
    path: 'add-task', loadChildren: () => import('./add-task/add-task.module').then(m => m.AddTaskModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

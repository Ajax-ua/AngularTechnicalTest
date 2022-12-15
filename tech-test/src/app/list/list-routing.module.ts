import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksResolver } from '../core/resolvers/tasks.resolver';
import { ListComponent } from './list.component';

const routes: Routes = [{
  path: '',
  component: ListComponent,
  resolve: [TasksResolver],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskResolver } from '../core/resolvers/task.resolver';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'edit', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) },
    { path: '', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
  ],
  resolve: [TaskResolver],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }

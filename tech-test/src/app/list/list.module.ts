import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    SharedModule,
    ListRoutingModule,
    MatListModule,
    MatChipsModule,
    MatCheckboxModule,
  ]
})
export class ListModule { }

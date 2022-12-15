import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';


@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    SharedModule,
    DetailsRoutingModule,
    MatCardModule,
    MatDividerModule,
  ]
})
export class DetailsModule { }

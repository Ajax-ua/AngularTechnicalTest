import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
  ],
  declarations: [
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    // material reusable modules
    MatIconModule,
    MatButtonModule,
  ],
})
export class SharedModule {
}

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  showToastr(msg: string): void {
    this.snackBar.open(msg);
  }

  showErrorToastr(msg: string): void {
    this.snackBar.open(msg, null, {
      panelClass: 'error-toast',
    });
  }
}

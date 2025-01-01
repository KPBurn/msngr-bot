import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { alertDialog } from '../../models/alertDialog.interface';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: alertDialog,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {}

  getAlertIcon(status: string) {
    switch (status) {
      case 'success':
        return 'check_circle';
      case 'danger':
      case 'warning':
        return 'priority_high';
      case 'failed':
        return 'cancel';

      default:
        return 'info';
    }
  }

  getAlertStatus(status: string) {
    switch (status) {
      case 'success':
        return 'green';
      case 'danger':
      case 'failed':
        return 'red';
      case 'warning':
        return 'yellow';

      default:
        return 'blue';
    }
  }

  // closeDialog() {
  //   this.dialogRef.closeAll();
  // }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceEditDialogComponent } from '../resource-edit-dialog/resource-edit-dialog.component';

@Component({
  selector: 'app-resource-delete-dialog',
  templateUrl: './resource-delete-dialog.component.html',
  styleUrls: ['./resource-delete-dialog.component.css']
})
export class ResourceDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ResourceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

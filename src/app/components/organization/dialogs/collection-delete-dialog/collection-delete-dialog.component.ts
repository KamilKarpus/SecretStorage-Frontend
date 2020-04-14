import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-collection-delete-dialog',
  templateUrl: './collection-delete-dialog.component.html',
  styleUrls: ['./collection-delete-dialog.component.css']
})
export class CollectionDeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CollectionDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

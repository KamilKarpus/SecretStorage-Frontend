import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionService } from 'src/app/_services/collection/collection.service';
import { EditResourceModel } from 'src/app/_models/collection/editResource.model';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  organizationId: string;
  collectionId: string;
  resourceId: string;
  resource: string;
}

@Component({
  selector: 'app-resource-edit-dialog',
  templateUrl: './resource-edit-dialog.component.html',
  styleUrls: ['./resource-edit-dialog.component.css']
})
export class ResourceEditDialogComponent implements OnInit {

  oldResource: string = this.data.resource;
  newResource: string = this.oldResource;

  constructor(public dialogRef: MatDialogRef<ResourceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public collectionService: CollectionService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  editResource(){
    this.collectionService.editResource(this.data.organizationId, this.data.collectionId, this.data.resourceId,
       new EditResourceModel(this.newResource)).subscribe(data=>{
         this.toastr.info("Dane pomyślnie zedytowane");
        this.dialogRef.close();
      })
  }

}

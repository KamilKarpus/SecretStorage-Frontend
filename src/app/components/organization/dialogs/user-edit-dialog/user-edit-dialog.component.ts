import { Component, OnInit, Inject } from '@angular/core';
import { OrganizationService } from 'src/app/_services/organization/organization.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/_models/user/User.model';
import { RoleModel } from 'src/app/_models/organization/Role.model';
import { getOneOrganizationModel } from 'src/app/_models/organization/getOneOrganization.model';

export interface DialogData {
  userM: UserModel;
  organizationId: string;
}

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent implements OnInit {

  sel: string;
  role: string = this.data.userM.role.toString();
  constructor(public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,  public organizationService: OrganizationService) { }

  ngOnInit(): void {
    switch(this.role){
      case "User":
        this.sel="3";
        break;
      case "Admin":
        this.sel="2";
        break;
      case "Owner":
        this.sel = "1";
        break;
    }
  }
 
  changeRole(){
    this.organizationService.changeUserRole(this.data.organizationId, this.data.userM.id, new RoleModel(parseInt(this.sel)))
    .subscribe(data=>{
    })
  }

  deleteUser(userId: string, organizationId: string) {
    this.organizationService.deleteUser(organizationId, userId).subscribe(data=>{
    })
  }
}

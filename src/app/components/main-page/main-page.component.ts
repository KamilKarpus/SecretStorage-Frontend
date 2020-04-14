import { Component, OnInit, ViewChild } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { organizationModel } from 'src/app/_models/organization/organization.model';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { OrganizationService } from 'src/app/_services/organization/organization.service';
import { getAllOrganizationsModel } from 'src/app/_models/organization/getAllOrganization.model';
import { addOrganizationModel } from 'src/app/_models/organization/addOrganization.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/_services/user/user.service';
import { RefreshTokenModel } from 'src/app/_models/user/RefreshToken.model';
import { responseWithRefreshTokenModel } from 'src/app/_models/response/responseWithRefreshToken.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  displayName: string;

  organizationName: string="";

  getOrganization: getAllOrganizationsModel;
  displayedColumns: string[] = ['organization', 'options'];
  dataSource: MatTableDataSource<organizationModel>;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex: number;
  pageSize: number;
  length:number;
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  id: string;
  
  constructor(public router: Router, public organizationService: OrganizationService, private toastr: ToastrService,
    public dialog: MatDialog, public userService: UserService) { }

  ngOnInit(): void {
    this.displayName = jwt_decode(localStorage.getItem('token')).displayname;
    console.log(localStorage.getItem('token'));
    this.readAllOrganizations(1,5);
  }

  readAllOrganizations(page: number, size: number){
    this.organizationService.getAllOrganizations<getAllOrganizationsModel>(page,size).subscribe(data=>{
      this.getOrganization = data; 
      this.dataSource = new MatTableDataSource<organizationModel>(this.getOrganization.items);
      this.length = this.getOrganization.totalCount;
      
    })
  }

  handlePage(event?:PageEvent){
    this.readAllOrganizations(event.pageIndex+1, event.pageSize);
    return event;
  }


  addNewOrganization(){

    if(this.organizationName.length>=3){
      this.organizationService.addOrganization(new addOrganizationModel(this.organizationName))
      .subscribe(data=>{
        
        this.toastr.success('Sukces!', 'Dodałeś nową organizację!');
        this.length+=1;
        this.userService.refreshToken(new RefreshTokenModel(localStorage.getItem('refreshToken')))
        .subscribe(data=>{
          localStorage.setItem('token', data.token);
          localStorage.setItem('refreshToken', data.refreshToken); 
        })
        this.readAllOrganizations(this.paginator.pageIndex+1, this.paginator.pageSize);
        this.organizationName="";
      })
    }

    else {
      this.toastr.warning("Nazwa organizacji musi składać się z minimum 3 znaków!");
    }
    
  }

  canDelete(orgID: string){
    const orgid = jwt_decode(localStorage.getItem('token'))[orgID];
    return !orgid.includes("CanEditOrganization");
  }

  deleteOrg(id: string){
    this.id = id;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.organizationService.deleteOrganization(this.id).subscribe(data=>{
          this.readAllOrganizations(this.paginator.pageIndex+1, this.paginator.pageSize);
          this.toastr.info('Usunięto organizację!');
        });
      }
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}

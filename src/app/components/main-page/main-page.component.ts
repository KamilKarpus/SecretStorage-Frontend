import { Component, OnInit, ViewChild } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { organizationModel } from 'src/app/_models/organization/organization.model';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { OrganizationService } from 'src/app/_services/organization/organization.service';
import { getAllOrganizationsModel } from 'src/app/_models/organization/getAllOrganization.model';
import { addOrganizationModel } from 'src/app/_models/organization/addOrganization.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  displayName: string;

  organizationName: string;

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
  
  constructor(public router: Router, public organizationService: OrganizationService) { }

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
    this.organizationService.addOrganization(new addOrganizationModel(this.organizationName))
    .subscribe(data=>{
      this.length+=1;
      this.readAllOrganizations(this.paginator.pageIndex+1, this.paginator.pageSize);
    })
  }

  canDelete(orgID: string){
    // const orgid = jwt_decode(localStorage.getItem('token'))[orgID];
    // return !orgid.includes("CanEditOrganization");
  }

  deleteOrg(id: string){
    this.organizationService.deleteOrganization(id).subscribe(data=>{
      this.readAllOrganizations(this.paginator.pageIndex+1, this.paginator.pageSize);
    });
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/_models/user/User.model';
import { OrganizationService } from 'src/app/_services/organization/organization.service';
import { getOneOrganizationModel } from 'src/app/_models/organization/getOneOrganization.model';
import { EmailModel } from 'src/app/_models/user/Email.model';
import { UserEditDialogComponent } from './dialogs/user-edit-dialog/user-edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddNewCollectionModel } from 'src/app/_models/collection/addNewCollection.model';
import { CollectionService } from 'src/app/_services/collection/collection.service';
import { getAllCollectionsModel } from 'src/app/_models/collection/getAllCollections.model';
import { CollectionModel } from 'src/app/_models/collection/collection.model';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  displayName: string;
  id: string;
  organizationName: string;

  userEmail: string;
  ownerCounter: number;

  displayedColumns: string[] = ['displayName', 'role'];
  public dataSource: MatTableDataSource<UserModel>;
  
  collectionName: string;

  length:number;
  displayedColumnsColl: string[] = ['organization', 'options'];
  dataSourceColl: MatTableDataSource<CollectionModel>;
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  constructor(public router: Router, public organizationService: OrganizationService,
     private activatedRoute: ActivatedRoute, public dialog: MatDialog, public collectionService: CollectionService) { }

  ngOnInit(): void {
    this.displayName = jwt_decode(localStorage.getItem('token')).displayname;
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.getOrganization(this.id);
    this.getAllCollections(1, 5, this.id);
  }

  addNewUser(id: string, email: EmailModel){
    this.organizationService.addUserToOrganization(id, email).subscribe(data=>{
      this.getOrganization(this.id);
    })
  }

  newUser(){
    this.addNewUser(this.id,new EmailModel(this.userEmail));
  }

  public getOrganization(id: string){
    this.organizationService.getOneOrganization<getOneOrganizationModel>(id).subscribe(data=>{
      this.organizationName = data.name;
      this.dataSource = new MatTableDataSource<UserModel>(data.users);
      this.ownerCounter = 0;
      data.users.forEach(element => {
        if(element.role=="Owner"){
          this.ownerCounter+=1;
        }
      });   
      console.log(this.ownerCounter);
    })
  }

  canEdit(orgID: string){
    const orgid = jwt_decode(localStorage.getItem('token'))[orgID];
    return !orgid.includes("CanEditOrganization");
  }

  wyswietlID(user: UserModel){

    if(user.role=="Owner" && this.ownerCounter<2) {
      console.log("nie chuja");
    }
    else
      this.openDialog(user, this.id);
  }

  openDialog(user: UserModel, id: string): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '250px',
      data: {userM: user, organizationId: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getOrganization(this.id);
    });
    
  }

  newCollection(){
    this.collectionService.addNewCollection(this.id, new AddNewCollectionModel(this.collectionName)).subscribe(data=>{
      this.getAllCollections(this.paginator.pageIndex+1, this.paginator.pageSize, this.id);
    })
  }

  getAllCollections(currentPage: number, pageSize: number, organizationId: string){
    this.collectionService.getAllCollections<getAllCollectionsModel>(currentPage, pageSize, organizationId).subscribe(data=>{
      this.dataSourceColl = new MatTableDataSource<CollectionModel>(data.items);
      this.length = data.totalCount;
    })
  }

  handlePage(event?:PageEvent){
    this.getAllCollections(event.pageIndex+1, event.pageSize, this.id);
    return event;
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

}

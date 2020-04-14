import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { CollectionService } from 'src/app/_services/collection/collection.service';
import { addNewResourceModel } from 'src/app/_models/collection/addNewResource.model';
import { getCollectionsByIdModel } from 'src/app/_models/collection/getCollectionById.model';
import { resourceModel } from 'src/app/_models/collection/resource.model';
import { MatTableDataSource } from '@angular/material/table';
import { encryptedValueModel } from 'src/app/_models/collection/encryptedValue.model';
import { OrganizationService } from 'src/app/_services/organization/organization.service';
import { getOneOrganizationModel } from 'src/app/_models/organization/getOneOrganization.model';
import { GetResourceInfoModel } from 'src/app/_models/collection/getResourceInfo.model';
import { LogModel } from 'src/app/_models/collection/log.model';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { GetResourceLogsModel } from 'src/app/_models/collection/getResourceLogs.model';
import { MatDialog } from '@angular/material/dialog';
import { ResourceEditDialogComponent } from './resource-edit-dialog/resource-edit-dialog.component';
import { empty } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ResourceDeleteDialogComponent } from './resource-delete-dialog/resource-delete-dialog.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  displayName: string;
  organizationId: string;
  collectionId: string;
  resourceId: string;
  organizationName: string;
  collectionName: string;

  resourceName: string="";
  resourceData: string="";


  displayedColumns: string[] = ['displayName', 'options'];
  dataSource: MatTableDataSource<resourceModel>;

  ifEncrypt: boolean = false;
  encryptedData: string;
  resourceInfo: GetResourceInfoModel;

  length:number;
  displayedColumnsLogs: string[] = ['accesorName', 'status', 'time'];
  dataSourceLogs: MatTableDataSource<LogModel>;
  pageEvent: PageEvent;
  pageIndex: number;
  pageSize: number;
  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  ifCanEdit: boolean = true;

  constructor(public router: Router, private activatedRoute: ActivatedRoute, public collectionService: CollectionService,
    public organizationService: OrganizationService, public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.displayName = jwt_decode(localStorage.getItem('token')).displayname;
    this.organizationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.collectionId = this.activatedRoute.snapshot.paramMap.get('collectionId');

    this.getResources();
    this.getOrganization(this.organizationId);
    this.canEditCollection(this.organizationId);
  }

  newResource(){
    if(this.resourceName.length<3|| this.resourceData.length<3){
      this.toastr.warning("Nazwa danych oraz same dane musz skłądać się z minimum 3 znaków!");
    }
    else {
      this.collectionService.addNewResource(this.organizationId, this.collectionId, new addNewResourceModel(this.resourceName,this.resourceData))
      .subscribe(data=>{
      this.toastr.success('Dodałeś nowe szyfrowane dane!', 'Sukces!');
      this.getResources();
      this.resourceName="";
      this.resourceData="";
    })
    }
    
  }

  getResources(){
    this.collectionService.getCollection<getCollectionsByIdModel>(this.organizationId, this.collectionId).subscribe(data=>{
      this.dataSource = new MatTableDataSource<resourceModel>(data.resources);
      this.collectionName = data.name;
    })
  }

  encryptt(organizationId: string, collectionId: string, resourceId: string){
    this.collectionService.getEncryptedValueById<encryptedValueModel>(organizationId, collectionId, resourceId).subscribe(data=>{
      this.encryptedData = data.value;
    });
    this.collectionService.getResourceInfo<GetResourceInfoModel>(organizationId, collectionId, resourceId)
    .subscribe(data=>{
      this.resourceInfo = data;
      this.resourceId = data.id;
      this.ifEncrypt = true;
      this.getResourceLogs(1,5, this.organizationId, this.resourceInfo.id);
    })
    
    
  }

  getOrganization(id: string){
    this.organizationService.getOneOrganization<getOneOrganizationModel>(id).subscribe(data=>{
      this.organizationName = data.name;
    });   
      
  }

  getResourceLogs(currentPage: number, pageSize: number, organizationId: string, resourceId: string){
    this.collectionService.getResourceLogs<GetResourceLogsModel>(resourceId, organizationId, currentPage, pageSize).subscribe(data=>{
      this.dataSourceLogs = new MatTableDataSource<LogModel>(data.items);
      this.length = data.totalCount;
    })
  }

  handlePage(event?:PageEvent){
    this.getResourceLogs(event.pageIndex+1, event.pageSize, this.organizationId, this.resourceInfo.id);
    return event;
  }

  editResource(){
    this.openDialog(this.organizationId, this.collectionId, this.resourceId, this.encryptedData);
  }

  deleteResource(){
    this.openDialogDelete();
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(ResourceDeleteDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.collectionService.deleteResource(this.organizationId, this.collectionId, this.resourceId).subscribe(data=>{
          this.encryptedData = "";
          this.ifEncrypt = false;
          this.getResources();
          this.toastr.info("Usunięto szyfrowane dane")
          this.dataSourceLogs = null;
        })
      }
    });
  }

  openDialog(organizationId: string, collectionId: string, resourceId: string, resource: string): void {
    const dialogRef = this.dialog.open(ResourceEditDialogComponent, {
      width: '250px',
      data: {organizationId: organizationId, collectionId: collectionId, resourceId: resourceId, resource: resource}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.encryptt(this.organizationId, this.collectionId, this.resourceId);
    });
    
  }

  canEditCollection(orgID: string){
    const orgid = jwt_decode(localStorage.getItem('token'))[orgID];
    this.ifCanEdit = !orgid.includes("CanEditCollection");
  }

  refresh(){
    this.encryptedData = "";
    this.ifEncrypt = false;
    this.dataSourceLogs = null;

  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}

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

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  displayName: string;
  organizationId: string;
  collectionId: string;
  organizationName: string;
  collectionName: string;

  resourceName: string;
  resourceData: string;

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

  constructor(public router: Router, private activatedRoute: ActivatedRoute, public collectionService: CollectionService,
    public organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.displayName = jwt_decode(localStorage.getItem('token')).displayname;
    this.organizationId = this.activatedRoute.snapshot.paramMap.get('id');
    this.collectionId = this.activatedRoute.snapshot.paramMap.get('collectionId');

    this.getResources();
    this.getOrganization(this.organizationId);
  }

  newResource(){
    this.collectionService.addNewResource(this.organizationId, this.collectionId, new addNewResourceModel(this.resourceName,this.resourceData))
    .subscribe(data=>{
      this.getResources();
    })
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

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDeleteDialogComponent } from './resource-delete-dialog.component';

describe('ResourceDeleteDialogComponent', () => {
  let component: ResourceDeleteDialogComponent;
  let fixture: ComponentFixture<ResourceDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

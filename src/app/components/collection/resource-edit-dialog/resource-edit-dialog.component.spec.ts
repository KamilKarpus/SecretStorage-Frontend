import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceEditDialogComponent } from './resource-edit-dialog.component';

describe('ResourceEditDialogComponent', () => {
  let component: ResourceEditDialogComponent;
  let fixture: ComponentFixture<ResourceEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

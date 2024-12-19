import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertClientDialogComponent } from './upsert-client-dialog.component';

describe('UpsertClientDialogComponent', () => {
  let component: UpsertClientDialogComponent;
  let fixture: ComponentFixture<UpsertClientDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertClientDialogComponent]
    });
    fixture = TestBed.createComponent(UpsertClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

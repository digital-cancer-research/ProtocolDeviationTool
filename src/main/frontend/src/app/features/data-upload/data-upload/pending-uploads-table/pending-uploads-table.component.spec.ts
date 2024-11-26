import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingUploadsTableComponent } from './pending-uploads-table.component';

describe('PendingUploadsTableComponent', () => {
  let component: PendingUploadsTableComponent;
  let fixture: ComponentFixture<PendingUploadsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingUploadsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingUploadsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCategorisationComponent } from './data-categorisation.component';

describe('DataCategorisationComponent', () => {
  let component: DataCategorisationComponent;
  let fixture: ComponentFixture<DataCategorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataCategorisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataCategorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

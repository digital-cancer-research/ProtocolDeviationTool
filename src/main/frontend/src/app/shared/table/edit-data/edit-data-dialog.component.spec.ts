import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDataDialogueComponent } from './edit-data-dialogue.component';

describe('EditDataDialogueComponent', () => {
  let component: EditDataDialogueComponent;
  let fixture: ComponentFixture<EditDataDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDataDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDataDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

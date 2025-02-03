import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiStatementDialogueComponent } from './ai-statement-dialogue.component';

describe('AiStatementDialogueComponent', () => {
  let component: AiStatementDialogueComponent;
  let fixture: ComponentFixture<AiStatementDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiStatementDialogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiStatementDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

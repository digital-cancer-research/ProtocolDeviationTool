import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleSelectComponent } from './single-select.component';
import { SharedModule } from '../../shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

interface User {
  id: number;
  name: string;
}

describe('SingleSelectComponent', () => {
  let component: SingleSelectComponent<User>;
  let fixture: ComponentFixture<SingleSelectComponent<User>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleSelectComponent<User>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create search field', () => {
    component.search = true;
    fixture.detectChanges();
    const searchInput = fixture.nativeElement.querySelector('input[type="text"]');
    expect(searchInput).toBeTruthy();
  })

  it('should emit value onConfirm', () => {
    const user: User = { id: 1, name: 'John Doe' };
    spyOn(component.confirmedItem, 'emit');
    component['selectedItemStringify'] = component['toString'](user);
    component.onConfirm();
    expect(component.confirmedItem.emit).toHaveBeenCalledWith(user);
  })
});

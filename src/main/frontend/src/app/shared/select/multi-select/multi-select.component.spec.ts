import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MultiSelectComponent } from './multi-select.component';
import { SharedModule } from '../../shared.module';
import { MatCheckbox } from '@angular/material/checkbox';

interface Team {
  id: number;
  name: string;
}

const teams: Team[] = [
  { id: 1, name: 'Team A' },
  { id: 2, name: 'Team B' },
  { id: 3, name: 'Team C' }
];

const defaultTeams = [teams[0], teams[1]];

describe('MultiSelectComponent', () => {
  let component: MultiSelectComponent<Team>;
  let fixture: ComponentFixture<MultiSelectComponent<Team>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectComponent<Team>);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedItems to defaultValues on init', () => {
    component.defaultValues = defaultTeams;
    fixture.detectChanges();

    expect(component.selectedItems).toEqual(defaultTeams);
  });

  it('should update selectedItems when defaultValues changes', () => {
    component.defaultValues = defaultTeams;
    fixture.detectChanges();
    expect(component.selectedItems).toEqual(defaultTeams);

    const newDefaultValues = [teams[1], teams[2]];
    changeDefaultValues(newDefaultValues)

    expect(component.selectedItems).toEqual(newDefaultValues);
  });

  it('should check checkboxes when defaultValues is set on init', () => {
    component.items = teams;
    component.defaultValues = defaultTeams;
    fixture.detectChanges();

    expect(component.checkboxes.length).toEqual(3);
    expect(countAndValidateCheckedCheckboxes(defaultTeams)).toEqual(2);
  });

  it('should check checkboxes when defaultValues changes', () => {
    component.items = teams;
    component.defaultValues = defaultTeams;
    fixture.detectChanges();

    const newDefaultValues = teams;
    changeDefaultValues(newDefaultValues);

    expect(countAndValidateCheckedCheckboxes(newDefaultValues)).toEqual(3);

  })

  const changeDefaultValues = (newDefaultValues: Team[]) => {
    component.defaultValues = newDefaultValues;
    component.ngOnChanges({
      defaultValues: {
        currentValue: newDefaultValues,
        previousValue: [],
        firstChange: false,
        isFirstChange: () => false,
      }
    });
    fixture.detectChanges();
  }

  const countAndValidateCheckedCheckboxes = (validTeams: Team[]) => {
    const teamsToString = validTeams.map(t => component['toString'](t));
    const checkedCheckboxes = component.checkboxes.filter(cb => cb.checked && teamsToString.includes(cb.value));
    return checkedCheckboxes.length;
  }

});

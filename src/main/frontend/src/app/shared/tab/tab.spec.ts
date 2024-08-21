import { Tab } from './tab';

describe('Tab', () => {

  it('should create an instance with default values', () => {
    const tab = new Tab();
    expect(tab).toBeTruthy();
    expect(tab.label).toBe('');
    expect(tab.link).toBe('');
  });

  it('should create an instance with provided values', () => {
    const label = 'Test Label';
    const link = 'test-link';
    const tab = new Tab(label, link);

    expect(tab).toBeTruthy();
    expect(tab.label).toBe(label);
    expect(tab.link).toBe(link);
  });

  it('should allow updating the label and link', () => {
    const tab = new Tab();
    tab.label = 'Updated Label';
    tab.link = 'updated-link';

    expect(tab.label).toBe('Updated Label');
    expect(tab.link).toBe('updated-link');
  });

});
import { Select } from './select';

interface Clazz {
  foo: string;
  bar: string;
}

const items: Clazz[] = [
  { foo: 'foo1', bar: 'bar1' },
  { foo: 'foo2', bar: 'bar2' },
  { foo: 'foo3', bar: 'bar3' }
];

describe('Select', () => {
  let instance: Select<Clazz>;

  beforeEach(() => {
    instance = new Select<Clazz>;
    instance.items = items;
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });

  it('should return the item itself when keyField is not set', () => {
    const expectedItem = items[0];
    expect(instance.getFieldValue(items[0])).toBe(expectedItem);
  });

  it('should return the value of the specified keyField', () => {
    instance.keyField = 'foo';
    const expectedItem = items[0].foo;
    expect(instance.getFieldValue(items[0])).toBe(expectedItem);
    expect(instance.getFieldValue(items[0])).toBe(expectedItem);
  });

  it('should return all items when filter is empty', () => {
    expect(instance.getFilteredItems()).toEqual(items);
  })

  it('should return filtered items when filter is set', () => {
    const expectedItem = items[0];
    instance['searchTerm'] = "1"
    instance.keyField = 'foo';
    expect(instance.getFilteredItems()).toEqual([expectedItem]);
  })

  it('should return no items when filter is set', () => {
    instance['searchTerm'] = "4"
    instance.keyField = 'foo';
    expect(instance.getFilteredItems()).toEqual([]);
  })

  it('should return true when comparing objects with the same field values', () => {
    const item1 = items[0];
    const item2 = { foo: 'foo1', bar: 'bar1'};
    expect(instance.compare(item1, item2)).toBe(true);
  })

  it('should return false when comparing objects with different field values', () => {
    const item1 = items[0];
    const item2 = items[1];
    expect(instance.compare(item1, item2)).toBe(false);
  })

});

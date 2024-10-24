import { SentenceCasePipe } from './sentence-case.pipe';

describe('SentenceCasePipe', () => {
  const pipe = new SentenceCasePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transfroms an empty string to an empty string', () => {
    expect(pipe.transform(""))
    .toBe("");
  })

  it('transfroms "a" to "A"', () => {
    expect(pipe.transform("a"))
    .toBe("A");
  })

  it('transfroms "A" to "A"', () => {
    expect(pipe.transform("A"))
    .toBe("A");
  })
  
  it('transforms a longer string', () => {
    expect(pipe.transform("lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"))
    .toBe("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod");
  })

  it('transforms "123" to "123"', () => {
    expect(pipe.transform("123"))
    .toBe("123")
  })
});

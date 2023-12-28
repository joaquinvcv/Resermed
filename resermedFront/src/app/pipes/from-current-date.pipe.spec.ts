import { FromCurrentDatePipe } from './from-current-date.pipe';

describe('FromCurrentDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FromCurrentDatePipe();
    expect(pipe).toBeTruthy();
  });
});

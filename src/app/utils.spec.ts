import { Utils } from './utils';

describe('Utils', () => {
  it('should create an instance', () => {
    expect(new Utils()).toBeTruthy();
  });

  it('should return a positive integer', () => {
    expect(Utils.getElapsedMonths(new Date('2021-09-01'), new Date())).toBeGreaterThan(0);
    expect(Utils.getElapsedMonths(new Date('2021-09-01'), new Date()) % 1).toBe(0);
  });

  it('should calculate the correct number of months', () => {
    expect(Utils.getElapsedMonths(new Date('2021-09-01'), new Date('2022-09-01'))).toBe(12);
  });
});

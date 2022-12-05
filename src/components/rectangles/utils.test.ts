import { getDaysDifference } from "./utils";

describe('getDaysDifference', () => {
  it('should give correct days difference between two dates', () => {
    const firstDate = new Date('2020-04-04');
    const secondDate = new Date('2020-04-10')
    expect(getDaysDifference(firstDate, secondDate)).toBe(6);
  });
});
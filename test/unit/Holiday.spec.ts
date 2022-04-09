import Holiday from '@src/entities/Holiday';
import EmptyNameError from '@src/entities/util/errors/EmptyNameError';

describe("Holiday instantiation", () => {
  it("Should instantiate a Holiday", () => {
    const holiday: Holiday = new Holiday(1, 'Natal', new Date(2022, 11, 25));
    expect(holiday).toBeDefined();
  });
  it("Should throw an error because of an invalid name", () => {
    expect(() => new Holiday(1, '', new Date(2022, 11, 25))).toThrow(EmptyNameError);
  });
})
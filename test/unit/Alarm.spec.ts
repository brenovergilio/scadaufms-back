import Alarm from '@src/entities/Alarm';
import EmptyMessageError from '@src/entities/util/errors/EmptyMessageError';

describe("Holiday instantiation", () => {
  it("Should instantiate a Holiday", () => {
    const holiday: Alarm = new Alarm(1, 1, new Date(), 'Sem conexão');
    expect(holiday).toBeDefined();
  });
  it("Should throw an error because of an invalid name", () => {
    expect(() => new Alarm(1, 1, new Date(), '')).toThrow(EmptyMessageError);
  });
})
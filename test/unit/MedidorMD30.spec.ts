import MedidorMD30 from '@src/entities/MedidorMD30';
import EmptyNameError from '@src/entities/util/errors/EmptyNameError';
import InvalidIPv4Error from '@src/entities/util/errors/InvalidIPv4Error';
import InvalidPortError from '@src/entities/util/errors/InvalidPortError';
import InvalidRushError from '@src/entities/util/errors/InvalidRushError';

describe('MedidorMD30 instantiation', () => {
  it('Should instantiate a MedidorMD30', () => {
    const medidorMD30: MedidorMD30 = new MedidorMD30(
      1,
      '200.129.210.97',
      'Reitoria',
      1001,
      { hour: 17, minute: 30, interval: 3 }
    );
    expect(medidorMD30).toBeDefined();
  });
  it('Should throw an error because of an invalid ipv4', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.097', 'Reitoria', 1001, {
          hour: 17,
          minute: 30,
          interval: 3,
        })
    ).toThrow(InvalidIPv4Error);
  });
  it('Should throw an error because of an invalid name', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.97', '', 1001, {
          hour: 17,
          minute: 30,
          interval: 3,
        })
    ).toThrow(EmptyNameError);
  });
  it('Should throw an error because of an invalid port', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.97', 'Reitoria', -1, {
          hour: 17,
          minute: 30,
          interval: 3,
        })
    ).toThrow(InvalidPortError);
  });
  it('Should throw an error because of an invalid port', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.97', 'Reitoria', 100000, {
          hour: 17,
          minute: 30,
          interval: 3,
        })
    ).toThrow(InvalidPortError);
  });
  it('Should throw an error because of an invalid rush (out of range hour)', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.97', 'Reitoria', 1001, {
          hour: 25,
          minute: 30,
          interval: 3,
        })
    ).toThrow(InvalidRushError);
  });
  it('Should throw an error because of an invalid rush (negative hour)', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.97', 'Reitoria', 1001, {
          hour: -1,
          minute: 30,
          interval: 3,
        })
    ).toThrow(InvalidRushError);
  });
  it('Should throw an error because of an invalid rush (out of range minute)', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.97', 'Reitoria', 1001, {
          hour: 24,
          minute: 61,
          interval: 3,
        })
    ).toThrow(InvalidRushError);
  });
  it('Should throw an error because of an invalid rush (negative minute)', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.97', 'Reitoria', 1001, {
          hour: 24,
          minute: -1,
          interval: 3,
        })
    ).toThrow(InvalidRushError);
  });
  it('Should throw an error because of an invalid rush (out of range interval)', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.97', 'Reitoria', 1001, {
          hour: 24,
          minute: 30,
          interval: 25,
        })
    ).toThrow(InvalidRushError);
  });
  it('Should throw an error because of an invalid rush (negative interval)', () => {
    expect(
      () =>
        new MedidorMD30(1, '200.129.210.97', 'Reitoria', 1001, {
          hour: 24,
          minute: 30,
          interval: -1,
        })
    ).toThrow(InvalidRushError);
  });
});

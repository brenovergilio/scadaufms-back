export default class InvalidValueError extends Error {
  constructor() {
    super('Valor inválido');
  }
}

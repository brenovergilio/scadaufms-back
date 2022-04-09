export default class EmptyNameError extends Error {
  constructor() {
    super('O nome não pode ser vazio');
  }
}

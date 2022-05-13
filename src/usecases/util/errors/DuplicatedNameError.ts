export default class DuplicatedNameError extends Error {
  constructor() {
    super('Nome já cadastrado');
  }
}

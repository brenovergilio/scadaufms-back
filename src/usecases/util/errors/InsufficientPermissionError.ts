export default class InsufficentPermissionError extends Error {
  constructor() {
    super('Não autorizado');
  }
}

export default class UnauthorizedError extends Error {
  constructor() {
    super('Acesso negado');
  }
}

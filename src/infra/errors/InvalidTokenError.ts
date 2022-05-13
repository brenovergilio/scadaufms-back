export default class InvalidTokenError extends Error {
  constructor() {
    super('Token Inválido');
  }
}

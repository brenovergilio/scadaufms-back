export default class InvalidUsernameError extends Error {
  constructor() {
    super('Nome de usuário inválido');
  }
}

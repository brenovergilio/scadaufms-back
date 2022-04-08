export default class NotFoundError extends Error {
  constructor() {
    super("Registro não encontrado");
  }
}
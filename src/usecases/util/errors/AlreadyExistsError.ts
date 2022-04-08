export default class AlreadyExistsError extends Error {
  constructor() {
    super("Registro já existente");
  }
}
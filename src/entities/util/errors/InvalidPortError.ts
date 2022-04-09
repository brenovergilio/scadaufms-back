export default class InvalidPortError extends Error {
  constructor() {
    super('A porta de conexão deve estar entre 0 e 65535');
  }
}

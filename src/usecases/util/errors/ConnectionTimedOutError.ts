export default class ConnectionTimedOutError extends Error {
  constructor() {
    super('Tempo de conexão esgotado. Por favor, cheque se o medidor está online');
  }
}

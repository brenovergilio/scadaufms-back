export default class isEmptyMessageError extends Error {
  constructor() {
    super('A mensagem não pode ser vazia');
  }
}

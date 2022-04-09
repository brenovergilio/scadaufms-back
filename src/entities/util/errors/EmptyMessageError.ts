export default class EmptyMessageError extends Error {
  constructor() {
    super('A mensagem não pode ser vazia');
  }
}

export default class InvalidIPv4Error extends Error {
  constructor() {
    super("IPv4 inválido");
  }
}
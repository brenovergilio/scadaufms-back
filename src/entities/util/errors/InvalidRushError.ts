export default class InvalidRushError extends Error {
  constructor() {
    super("Horário de ponta inválido");
  }
}
export default class InvalidPeakError extends Error {
  constructor() {
    super("Horário de pico inválido");
  }
}
export default class isEmptyNameError extends Error {
  constructor() {
    super("O nome não pode ser vazio");
  }
}
export function isEmptyArray(arr: Array<any>): boolean {
  return arr === undefined || arr.length === 0;
}

export function formatNumberToBRL(number: number): string {
  let formatedNumber = `R$${number.toFixed(2)}`.replace('.', ',');
  if (formatedNumber.indexOf(',') === -1)
    formatedNumber += ',00';
  else if (formatedNumber.split(',')[ 1 ].length === 1)
    formatedNumber += '0';
  return formatedNumber;
}
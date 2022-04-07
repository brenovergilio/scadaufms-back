import isEmptyNameError from "./util/errors/EmptyNameError";
import InvalidIPv4Error from "./util/errors/InvalidIPv4Error";
import InvalidPeakError from "./util/errors/InvalidPeakError";
import Measurer from "./interfaces/Measurer";
import Peak from "./interfaces/Peak";
import { isValidIPv4 } from "./util/validators/IPValidators";
import { isValidPeak } from "./util/validators/PeakValidator";
import { isEmptyString } from "./util/validators/StringValidators";

export default class MedidorMD30 implements Measurer {

  ip: string;
  name: string;
  port: number;
  peak: Peak;

  constructor(ip: string, name: string, port: number, peak: Peak = {hour: 17, minute: 30, interval: 3}) {
    if(isValidIPv4(ip))
      this.ip = ip;
    else
      throw new InvalidIPv4Error();

    if(isEmptyString(name))
      throw new isEmptyNameError();

    this.name = name;
    this.port = port;
    
    if(isValidPeak(peak))
      this.peak = peak;
    else
      throw new InvalidPeakError();
  }
}
export class StrUtils {
  static hasValue(str: any): boolean {
    return str != undefined && str != null && str != '';
  }
}
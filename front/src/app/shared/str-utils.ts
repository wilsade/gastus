export class StrUtils {
  static hasValue(str: string): boolean {
    return str != undefined && str != null && str != '';
  }
}
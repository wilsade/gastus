import { formatDate } from "@angular/common";

export class StrUtils {
  static hasValue(str: any): boolean {
    return str != undefined && str != null && str != '';
  }

  /**
   * Incluir separador de milhar, formatar números negativos
   * @param item Número decimal
   * @returns Número formatado
   */
  static formatValue(item: number): string {
    const formattedValue = item.toFixed(2).replace('.', ',');
    const parts = formattedValue.split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedWithThousands = parts.join(',');

    if (item < 0)
      return `(${formattedWithThousands.replace('-', '')})`;
    else
      return formattedWithThousands;
  }
}

type DateTypes = Date | string | number;
export class DateUtils {
  public static readonly DIA_MES_ANO = 'dd/MM/yyyy';
  public static readonly EN_US = 'en-US';

  /**
   * Converter string no formato dd/MM/yyyy para Date
   * @param date_str Data no formato dd/MM/yyyy
   * @returns Date
   */
  public static strToDate(date_str: string): Date {
    const [day, month, year] = date_str.split('/').map(Number);
    const date = new Date(year, month - 1, day, 0, 0, 0, 0);
    return date;
  }

  /**
   * Formatar para data do Brasil (dd/MM/yyyy)
   * @param data Data a ser formatada
   * @returns Data em formado string
   */
  public static toBrazilDate(data: DateTypes): string {
    const formatado = formatDate(data, this.DIA_MES_ANO, this.EN_US);
    return formatado;
  }

  /**
   * Formatar para data do Brasil (dd/MM/yyyy hh:mm)
   * @param data Data a ser formatada
   * @returns Data em formado string
   */
  public static toBrazilDateTimeWithMinuts(data: DateTypes): string {
    const formatado = formatDate(data, `${this.DIA_MES_ANO} HH:mm`, this.EN_US);
    return formatado;
  }

  /**
   * Formatar para data do Brasil (dd/MM/yyyy hh:mm:ss)
   * @param data Data a ser formatada
   * @returns Data em formado string
   */
  public static toBrazilDateTimeWithSeconds(data: DateTypes): string {
    const formatado = formatDate(data, `${this.DIA_MES_ANO} HH:mm:ss`, this.EN_US);
    return formatado;
  }

  /**
   * Formatar uma data conforme formado desejado
   * @param data Data a ser formatada
   * @param format Formato desejado. Ex: "dd-MM-yyyy_HH-mm"
   * @returns Formatar data em string
   */
  public static toCustomFormat(data: DateTypes, format: string): string {
    const formatado = formatDate(data, format, this.EN_US);
    return formatado;
  }
}

declare global {
  interface String {
    /**
     * Remover todos os espaços da string
     * @returns string sem espaços
     */
    removeSpaces(): string;

    equalsInsensitive(other: string): boolean;
    containsInsensitive(other: string): boolean;
    startsWithInsensitive(other: string): boolean;
  }
}

String.prototype.removeSpaces = function (this: string) { // NOSONAR
  const removed = this.split(" ").join("");
  return removed;
};


String.prototype.equalsInsensitive = function (this: string, other: string) { // NOSONAR
  return this.localeCompare(other, undefined, { sensitivity: 'accent' }) === 0;
};

String.prototype.containsInsensitive = function (this: string, other: string) { // NOSONAR
  if (!StrUtils.hasValue(this))
    return false;
  return this.toLocaleLowerCase().indexOf(other.toLocaleLowerCase()) != -1
};

// @ts-ignore
String.prototype.startsWithInsensitive = function (this: string, other: string) { // NOSONAR
  if (!StrUtils.hasValue(this))
    return false;
  return this.toLocaleLowerCase().startsWith(other.toLocaleLowerCase());
};

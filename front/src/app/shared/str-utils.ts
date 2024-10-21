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
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
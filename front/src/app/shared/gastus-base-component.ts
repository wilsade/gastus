import { HttpErrorResponse } from "@angular/common/http";
import { PoInfoOrientation, PoNotificationService, PoSelectOption, PoTableColumn, PoTableColumnSpacing } from "@po-ui/ng-components";
import { StrUtils } from "./str-utils";

export abstract class GastusBaseComponent {

  constructor(protected readonly _notification: PoNotificationService) { }

  protected iconeEditar = 'ph-fill ph-pencil-simple';
  protected iconeExcluir = 'ph-fill ph-minus-circle';
  protected iconeInserir = 'ph-fill ph-plus-square';
  protected iconeAtualizar = 'ph-fill ph-arrows-clockwise';
  protected alturaVisao = 400;
  protected spacingSmall = PoTableColumnSpacing.Small;
  protected infoOrientacaoHorizontal = PoInfoOrientation.Horizontal;

  /**
   * Criar a coluna para o Identificador da entidade
   * @returns Coluna para o Id
   */
  protected createColumnId(visivel: boolean = true): PoTableColumn {
    return { label: 'Id.', property: 'Id', width: '10%', visible: visivel }
  }

  /**
   * Criar a coluna para o Nome da entidade
   * @returns Coluna para o Nome
   */
  protected createColumnNome(): PoTableColumn {
    return { label: 'Nome', property: 'Nome' }
  }

  protected tratarErro(err: HttpErrorResponse): void {
    const mensagemGenerica = err.message;
    let mensagemEspecifica: string = '';
    if (err.error?.message)
      mensagemEspecifica = err.error.message;

    if (StrUtils.hasValue(mensagemEspecifica))
      this._notification.error({
        message: mensagemEspecifica,
        supportMessage: mensagemGenerica,
      });
    else
      this._notification.error(mensagemGenerica);
  }

  protected convertToDateString(valor: Date): string {
    return new Date(valor).toLocaleDateString();
  }

  protected getMeses(): PoSelectOption[] {
    return [
      { value: 1, label: 'Janeiro' },
      { value: 2, label: 'Fevereiro' },
      { value: 3, label: 'Março' },
      { value: 4, label: 'Abril' },
      { value: 5, label: 'Maio' },
      { value: 6, label: 'Junho' },
      { value: 7, label: 'Julho' },
      { value: 8, label: 'Agosto' },
      { value: 9, label: 'Setembro' },
      { value: 10, label: 'Outubro' },
      { value: 11, label: 'Novembro' },
      { value: 12, label: 'Dezembro' }
    ]
  }

  protected showSuccess(message: string, timeout: number = 1500): void {
    this._notification.success({ message: message, duration: timeout });
  }

  protected showWarning(message: string, timeout: number = 1500): void {
    this._notification.warning({ message: message, duration: timeout });
  }

}

import { HttpErrorResponse } from "@angular/common/http";
import { PoNotificationService, PoTableColumn } from "@po-ui/ng-components";
import { StrUtils } from "./str-utils";

export abstract class GastusBaseComponent {

  constructor(protected readonly _notification: PoNotificationService) { }

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
}

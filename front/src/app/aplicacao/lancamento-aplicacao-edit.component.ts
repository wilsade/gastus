import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { FormsModule } from '@angular/forms';
import { StrUtils } from '../shared/str-utils';
import { AplicacaoService } from './aplicacao.service';
import { ILancamentoAplicacao } from '../_models/IAplicacao';

@Component({
  selector: 'app-lancamento-aplicacao-edit',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lancamento-aplicacao-edit.component.html'
})
export class LancamentoAplicacaoEditComponent extends GastusBaseComponent {
  constructor(protected override _notification: PoNotificationService,
    private readonly _service: AplicacaoService) {
    super(_notification);
  }

  @ViewChild('modal')
  modal: PoModalComponent

  @Output()
  salvou = new EventEmitter<void>();

  protected titulo = '';
  dataLancamento: Date | undefined = undefined;
  valorLancamento: number | undefined = undefined;
  private _idAplicacao = 0;

  protected readonly confirmou: PoModalAction = {
    label: 'Salvar e fechar',
    disabled: true,
    action: () => {
      this._service.inserirLancamentoAplicacao(this.getLancamentoAplicacao()).subscribe({
        next: data => {
          this.salvou.emit();
          this.modal.close();
        },
        error: err => this.tratarErro(err)
      })
    }
  }

  protected readonly cancelou: PoModalAction = {
    label: 'Cancelar',
    action: () => {
      this.modal.close();
    }
  }

  private getLancamentoAplicacao(): ILancamentoAplicacao {
    return {
      IdAplicacao: this._idAplicacao, Id: 0,
      Data: this.dataLancamento!, Valor: this.valorLancamento!
    };
  }

  showInsertModal(idAplicacao: number, nomeAplicacao: string): void {
    this.dataLancamento = undefined;
    this.valorLancamento = undefined;
    this._idAplicacao = idAplicacao;
    this.titulo = nomeAplicacao;
    this.modal.open();
  }

  protected alterouCampo(): void {
    this.confirmou.disabled = !StrUtils.hasValue(this.dataLancamento) ||
      !StrUtils.hasValue(this.valorLancamento);
  }
}

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
  private _id = 0;
  private _isInsert = false;

  protected readonly confirmou: PoModalAction = {
    label: 'Salvar e fechar',
    disabled: true,
    action: () => {
      if (this._isInsert)
        this._service.inserirLancamentoAplicacao(this.getLancamentoAplicacao()).subscribe({
          next: data => {
            this.modal.close();
            this.salvou.emit();
          },
          error: err => this.tratarErro(err)
        });
      else
        this._service.editarLancamentoAplicacao(this.getLancamentoAplicacao()).subscribe({
          next: data => {
            this.modal.close();
            this.salvou.emit();
          },
          error: err => this.tratarErro(err)
        });
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
      IdAplicacao: this._idAplicacao, Id: this._id,
      Data: this.dataLancamento!, Valor: this.valorLancamento!
    };
  }

  showInsertModal(idAplicacao: number, nomeAplicacao: string): void {
    this.modal.title = 'Inserção de lançamento';
    this._isInsert = true;
    this.dataLancamento = undefined;
    this.valorLancamento = undefined;
    this._idAplicacao = idAplicacao;
    this.titulo = nomeAplicacao;
    this.modal.open();
  }

  showEditModal(idAplicacao: number, nomeAplicacao: string, lancamento: ILancamentoAplicacao): void {
    this.modal.title = 'Alteração de lançamento';
    this._isInsert = false;
    this._idAplicacao = idAplicacao;
    this._id = lancamento.Id;
    this.dataLancamento = new Date(lancamento.Data);
    this.valorLancamento = lancamento.Valor;
    this.titulo = nomeAplicacao;
    this.modal.open();
  }

  protected alterouCampo(): void {
    this.confirmou.disabled = !StrUtils.hasValue(this.dataLancamento) ||
      !StrUtils.hasValue(this.valorLancamento);
  }
}

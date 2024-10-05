import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { ITipoTransacao } from '../_models/ITipoTransacao';
import { TipoTransacaoService } from './tipo-transacao.service';

@Component({
  selector: 'app-tipo-transacao-edit',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tipo-transacao-edit.component.html'
})
export class TipoTransacaoEditComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: TipoTransacaoService) {
    super(_notification);
  }

  protected meuTitulo: string;
  private _nomeOriginal: string;
  protected tipoTransacao: ITipoTransacao = this._service.getEmptyTipoTransacao();

  @ViewChild('modal')
  modal: PoModalComponent;

  @Output()
  onConfirmouModal = new EventEmitter<ITipoTransacao>();

  protected confirmouModal: PoModalAction = {
    label: 'Confirmar',
    action: () => {
      this.onConfirmouModal.emit(this.tipoTransacao);
      this.modal.close();
    }
  }

  protected cancelouModal: PoModalAction = {
    label: 'Cancelar',
    action: () => {
      this.modal.close();
    }
  }

  exibirModal(item: ITipoTransacao): void {
    this._nomeOriginal = item.Nome;
    this.meuTitulo = `Editar Tipo de transação: ${item.Nome}`;
    this.modal.open();
    this.loadTipoTransacao(item);
  }

  protected alterouNome(): void {
    this.confirmouModal.disabled = this._nomeOriginal === this.tipoTransacao.Nome;
  }

  private loadTipoTransacao(item: ITipoTransacao): void {
    this._service.getTipoTransacaoById(item.Id).subscribe({
      next: data => {
        this.tipoTransacao = data;
      },
      error: err => {
        this.tratarErro(err);
      },
      complete: () => {
      }
    });
  }

}

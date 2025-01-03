import { Component, Input, ViewChild } from '@angular/core';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { PoModule, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { IAplicacao, ILancamentoAplicacao } from '../_models/IAplicacao';
import { CommonModule } from '@angular/common';
import { ColunaValorComponent } from '../shared/coluna-valor.component';
import { AplicacaoService } from './aplicacao.service';
import { InputDialogService } from '../shared/input-dialog.service';
import { StrUtils } from '../shared/str-utils';
import { LancamentoAplicacaoEditComponent } from "./lancamento-aplicacao-edit.component";

@Component({
  selector: 'app-lancamentos-aplicacao',
  standalone: true,
  imports: [PoModule, CommonModule, ColunaValorComponent, LancamentoAplicacaoEditComponent],
  providers: [InputDialogService],
  templateUrl: './lancamentos-aplicacao.component.html'
})
export class LancamentosAplicacaoComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: AplicacaoService,
    private readonly _modalDlg: InputDialogService) {
    super(_notification);
  }

  @ViewChild('modalEdit')
  modalEdit: LancamentoAplicacaoEditComponent;

  @Input()
  aplicacao: IAplicacao = this._service.getEmptyAplicao();

  protected readonly acoesTabela: PoTableAction[] = [
    { label: 'Editar', icon: this.iconeEditar, action: this.editarLancamento.bind(this) },
    {
      label: 'Excluir', icon: this.iconeExcluir, action: (item: ILancamentoAplicacao) => {
        this._modalDlg.confirm({
          title: 'Exclusão de lançamento',
          message: `Atenção!<br><br>Deseja realmente EXCLUIR o lançamento? <br>
            <b>Data:</b> ${this.convertToDateString(item.Data)}<br>
            <b>Valor:</b> ${StrUtils.formatValue(item.Valor)}?`,
          confirm: () => this.excluirLancamento(item)
        });
      }
    }
  ]

  protected readonly colunasLancamentos: PoTableColumn[] = [
    { label: 'Data', property: 'Data', type: 'date', format: 'dd/MM/yyyy' },
    { label: 'Valor', property: 'Valor', type: 'cellTemplate' }
  ]

  private excluirLancamento(lancamento: ILancamentoAplicacao): void {
    this._service.excluirLancamentoAplicacao(lancamento.IdAplicacao, lancamento.Id).subscribe({
      next: data => {
        if (data > 0) {
          this.aplicacao.Lancamentos = this.aplicacao.Lancamentos.filter(lanc => lanc.Id != lancamento.Id);
          this._notification.information({ message: 'Lançamento excluído', duration: 1000 });
        }
      },
      error: err => this.tratarErro(err)
    });
  }

  private editarLancamento(lancamento: ILancamentoAplicacao): void {
    this.modalEdit.showEditModal(this.aplicacao.Id, this.aplicacao.Nome, lancamento);
  }
}

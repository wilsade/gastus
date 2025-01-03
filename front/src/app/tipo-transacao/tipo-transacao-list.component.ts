import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { TipoTransacaoService } from './tipo-transacao.service';
import { ITipoTransacao } from '../_models/ITipoTransacao';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { InputDialogService } from '../shared/input-dialog.service';
import { TipoTransacaoEditComponent } from './tipo-transacao-edit.component';

@Component({
  selector: 'app-tipo-transacao-list',
  standalone: true,
  imports: [PoModule, TipoTransacaoEditComponent],
  providers: [InputDialogService],
  templateUrl: './tipo-transacao-list.component.html'
})
export class TipoTransacaoListComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: TipoTransacaoService,
    private readonly _modalDlg: InputDialogService) {
    super(_notification);
  }

  loading = false;
  tiposTransacao: ITipoTransacao[] = [];

  @ViewChild('modalTipoTransacao', { static: false })
  modalTipoTransacao: TipoTransacaoEditComponent

  protected readonly colunas: PoTableColumn[] = [
    this.createColumnId(),
    this.createColumnNome()
  ]

  protected readonly acoesPagina: PoPageAction[] = [
    {
      label: 'Atualizar', icon: this.iconeAtualizar,
      action: () => this.carregarTiposTransacao()
    },
    {
      label: 'Inserir', action: () => {
        this._modalDlg.showInput({
          title: 'Inserção de Tipo de transação',
          label: 'Informe o Tipo de transação',
          onConfirm: (valor: string) => this.incluirTipoTransacao(valor)
        })
      }
    }
  ]

  protected readonly acoesTabela: PoTableAction[] = [
    { label: 'Editar', icon: this.iconeEditar, action: this.editarTipoTransacao.bind(this) },
    { label: 'Excluir', icon: this.iconeExcluir, action: this.excluirTipoTransacao.bind(this) }
  ]

  ngOnInit(): void {
    this.carregarTiposTransacao();
  }

  private editarTipoTransacao(item: ITipoTransacao): void {
    this.modalTipoTransacao.exibirModal(item);
  }

  private excluirTipoTransacao(item: ITipoTransacao): void {
    this._modalDlg.confirm({
      title: 'Exclusão de Tipo de transação',
      message: `Atenção!<br>Deseja realmente EXCLUIR o Tipo de transação <b>${item.Nome}</b>?`,
      confirm: () => {
        this._service.excluirTipoTransacao(item.Id).subscribe({
          next: data => {
            if (data > 0)
              this.tiposTransacao = this.tiposTransacao.filter(tipo => tipo.Id !== item.Id);
          },
          error: err => {
            this.tratarErro(err);
          }
        })
      }
    });
  }

  private incluirTipoTransacao(nome: string): void {
    this._service.inserirTipoTransacao(nome).subscribe({
      next: data => {
        this.tiposTransacao = [...this.tiposTransacao, data];
      },
      error: err => this.tratarErro(err)
    })
  }

  private carregarTiposTransacao() {
    this.loading = true;
    this._service.getTiposTransacao().subscribe({
      next: data => {
        this.tiposTransacao = data;
      },
      error: err => {
        this.tratarErro(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  protected tipoTransacaoAlterado(item: ITipoTransacao): void {
    this._service.editarTipoTransacao(item).subscribe({
      next: data => {
        this.ngOnInit();
      },
      error: err => {
        this.tratarErro(err);
      },
      complete: () => {
      }
    });
  }

}

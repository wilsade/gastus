import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { PoModule, PoNotificationService, PoPageAction, PoTableAction } from '@po-ui/ng-components';
import { InputDialogService } from '../shared/input-dialog.service';
import { AplicacaoService } from './aplicacao.service';
import { IAplicacao } from '../_models/IAplicacao';
import { CommonModule } from '@angular/common';
import { LancamentosAplicacaoComponent } from "./lancamentos-aplicacao.component";
import { LancamentoAplicacaoEditComponent } from './lancamento-aplicacao-edit.component';

@Component({
  selector: 'app-aplicacao-view',
  standalone: true,
  imports: [PoModule, CommonModule, LancamentosAplicacaoComponent, LancamentoAplicacaoEditComponent],
  providers: [InputDialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './aplicacao-view.component.html'
})
export class AplicacaoViewComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: AplicacaoService,
    private readonly _modalDlg: InputDialogService) {
    super(_notification);
  }

  @ViewChild('modalInsert')
  modalInsert: LancamentoAplicacaoEditComponent;

  protected loading = false;
  protected aplicacoes: IAplicacao[] = [];

  protected acoesPagina: PoPageAction[] = [
    {
      label: 'Atualizar', icon: this.iconeAtualizar,
      action: () => this.carregarAplicacoes()
    },
    {
      label: 'Inserir', action: () => {
        this._modalDlg.showInput({
          title: 'Inserir Aplicação',
          label: 'Informe o Nome da aplicação',
          onConfirm: (valor: string) => this.incluirAplicacao(valor)
        })
      }
    }
  ]

  protected readonly acoesTabela: PoTableAction[] = [
    { label: 'Editar', icon: this.iconeEditar, action: this.editarAplicacao.bind(this) },
    { label: 'Excluir', icon: this.iconeExcluir, action: this.excluirAplicacao.bind(this) }
  ]

  ngOnInit(): void {
    this.carregarAplicacoes();
  }

  private carregarAplicacoes() {
    this.loading = true;
    this._service.getAplicacoes().subscribe({
      next: data => {
        this.aplicacoes = data;
      },
      error: err => {
        this.loading = false;
        this.tratarErro(err)
      },
      complete: () => this.loading = false
    })
  }

  private incluirAplicacao(nome: string): void {
    this._service.inserirAplicacao(nome).subscribe({
      next: data => {
        this.aplicacoes = [...this.aplicacoes, data];
      },
      error: err => this.tratarErro(err)
    })
  }

  private excluirAplicacao(item: IAplicacao): void {
    this._modalDlg.confirm({
      title: 'Exclusão de Aplicação',
      message: `Atenção!<br>Deseja realmente EXCLUIR a Aplicação <b>${item.Nome}</b>?`,
      confirm: () => {
        this._service.excluirAplicacao(item.Id).subscribe({
          next: data => {
            if (data > 0)
              this.aplicacoes = this.aplicacoes.filter(tipo => tipo.Id !== item.Id);
          },
          error: err => {
            this.tratarErro(err);
          }
        })
      }
    });
  }

  protected editarAplicacao(item: IAplicacao): void {
    this._modalDlg.showInput({
      title: 'Editar Aplicação',
      label: 'Informe o nome da aplicação',
      valor: item.Nome,
      onConfirm: (valor: string) => {
        item.Nome = valor;
        this._service.editarAplicacao(item).subscribe({
          next: data => {
            if (data > 0) {
              this._notification.success({ message: 'Aplicação alterada', duration: 1000 });
            }
          },
          error: err => this.tratarErro(err)
        })
      }
    })
  }

  protected inserirLancamento_Click(item: IAplicacao): void {
    this.modalInsert.showInsertModal(item.Id, item.Nome);
  }

  protected excluirAplicacao_Click(item: IAplicacao): void {
    this._modalDlg.confirm({
      title: 'Exclusão de aplicação',
      message: `Atenção!<br><br>Deseja realmente EXCLUIR a aplicação <b>${item.Nome}</b>?`,
      confirm: () => {
        this._service.excluirAplicacao(item.Id).subscribe({
          next: data => {
            if (data > 0) {
              this.aplicacoes = this.aplicacoes.filter(a => a.Id != item.Id);
              this._notification.information({ message: 'Aplicação excluída', duration: 1000 });
            }
          },
          error: err => this.tratarErro(err)
        })
      }
    })
  }

  protected salvouLancamento(): void {
    this.carregarAplicacoes();
  }
}

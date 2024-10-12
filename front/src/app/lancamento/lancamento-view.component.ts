import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { ILancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { CommonModule } from '@angular/common';
import { LancamentoEditComponent } from './lancamento-edit.component';
import { InputDialogService } from '../shared/input-dialog.service';

@Component({
  selector: 'app-lancamento-view',
  standalone: true,
  imports: [CommonModule, PoModule, LancamentoEditComponent],
  providers: [InputDialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lancamento-view.component.html'
})
export class LancamentoViewComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: LancamentoService,
    private readonly _modalDlg: InputDialogService) {
    super(_notification);
  }

  loading = false;
  lancamentos: ILancamento[] = [];

  colunas: PoTableColumn[] = [
    this.createColumnId(false),
    { label: 'Data', property: 'Data', type: 'date', format: 'dd/MM/yyyy' },
    { label: 'Título', property: 'Titulo' },
    { label: 'Comentário', property: 'Comentario' },
    { label: 'Categoria', property: 'NomeCategoria' },
    { label: 'SubCategoria', property: 'NomeSubCategoria' },
    { label: 'Tipo', property: 'NomeTipoTransacao' },
    { label: 'Valor', property: 'Valor', type: 'cellTemplate' },
    { label: 'Saldo', property: 'SALDO', type: 'cellTemplate' }
  ]

  @ViewChild('modalLancamento')
  modalLancamento: LancamentoEditComponent;

  acoesPagina: PoPageAction[] = [
    {
      label: 'Atualizar', icon: this.iconeAtualizar,
      action: () => this.carregarLancamentos()
    },
    { label: 'Inserir', icon: this.iconeInserir, action: () => this.modalLancamento.showInsertModal() }
  ]

  acoesTabela: PoTableAction[] = [
    { label: 'Editar', icon: this.iconeEditar, action: this.editarLancamento.bind(this) },
    { label: 'Excluir', icon: this.iconeExcluir, action: this.excluirLancamento.bind(this) },

  ]

  ngOnInit(): void {
    this.carregarLancamentos();
  }

  private excluirLancamento(item: ILancamento): void {
    this._modalDlg.confirm({
      title: 'Exclusão de Lançamento',
      message: `Atenção!<br>Deseja realmente EXCLUIR O lançamento <b>${item.Id} - ${item.Titulo}</b>?`,
      confirm: () => {
        this._service.excluirLancamento(item.Id).subscribe({
          next: data => {
            if (data > 0) {
              this.lancamentos = this.lancamentos.filter(cat => cat.Id !== item.Id);
              this._notification.information('Lançamento excluído');
            }
          },
          error: err => {
            this.tratarErro(err);
          }
        })
      }
    });
  }

  private editarLancamento(item: ILancamento): void {
    this.modalLancamento.showEditModal(item);
  }

  private carregarLancamentos() {
    this.loading = true;
    this._service.getLancamentos().subscribe({
      next: data => {
        this.lancamentos = data;
      },
      error: err => {
        this.loading = false;
        this.tratarErro(err);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  protected fechouModal(): void {
    this.carregarLancamentos();
  }

  protected formatValue(item: number): string {
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

import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { ILancamento, ILancamentoView } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { CommonModule } from '@angular/common';
import { LancamentoEditComponent } from './lancamento-edit.component';
import { InputDialogService } from '../shared/input-dialog.service';
import { ColunaValorComponent } from "../shared/coluna-valor.component";
import { StrUtils } from '../shared/str-utils';
import { FiltroLancamentosComponent } from './filtro-lancamentos.component';
import { ImportarLancamentosComponent } from "./importar-lancamentos.component";

@Component({
  selector: 'app-lancamento-view',
  standalone: true,
  imports: [CommonModule, PoModule, LancamentoEditComponent, ColunaValorComponent,
    FiltroLancamentosComponent, ImportarLancamentosComponent],
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
  protected lancamentos_original: ILancamentoView[] = [];
  protected lancamentosExibidos: ILancamentoView[] = [];

  protected colunas: PoTableColumn[];

  @ViewChild('modalLancamento')
  protected modalLancamento: LancamentoEditComponent;

  @ViewChild('tableLancamentos')
  protected tableLancamentos: PoTableComponent;

  @ViewChild('filtroLancamentos')
  protected filtroLancamentos: FiltroLancamentosComponent;

  @ViewChild('modalImportacao')
  modalImportacao: ImportarLancamentosComponent;

  protected acoesPagina: PoPageAction[] = [
    {
      label: 'Atualizar', icon: this.iconeAtualizar,
      action: () => this.carregarLancamentos()
    },
    { label: 'Inserir', icon: this.iconeInserir, action: () => this.modalLancamento.showInsertModal() },
    { label: 'Importar', action: () => this.modalImportacao.openModal() }
  ]

  protected acoesTabela: PoTableAction[] = [
    { label: 'Editar', icon: this.iconeEditar, action: this.editarLancamento.bind(this) },
    { label: 'Excluir', icon: this.iconeExcluir, action: this.excluirLancamento.bind(this) },

  ]

  ngOnInit(): void {
    this.criarColunas(false, false, false);
    this.carregarLancamentos();
  }

  private criarColunas(idVisivel: boolean, comentarioVisivel: boolean, tipoVisivel: boolean): void {
    this.colunas = [
      this.createColumnId(idVisivel),
      { label: 'Data', property: 'Data', type: 'date', format: 'dd/MM/yyyy' },
      { label: 'Título', property: 'Titulo', type: 'cellTemplate' },
      { label: 'Comentário', property: LancamentoService.COLUNA_COMENTARIO, visible: comentarioVisivel },
      { label: 'Categoria', property: 'NomeCategoria' },
      { label: 'SubCategoria', property: 'NomeSubCategoria' },
      { label: 'Tipo', property: 'NomeTipoTransacao', visible: tipoVisivel },
      { label: 'Valor', property: 'Valor', type: 'cellTemplate' },
      { label: 'Saldo', property: 'SALDO', type: 'cellTemplate' }
    ]
  }

  protected alterouColunas(colunas: string[]): void {
    this.criarColunas(colunas.includes(LancamentoService.COLUNA_Id), colunas.includes(LancamentoService.COLUNA_COMENTARIO),
      colunas.includes(LancamentoService.COLUNA_IdTipoTransacao))
  }

  private excluirLancamento(item: ILancamento): void {
    this._modalDlg.confirm({
      title: 'Exclusão de Lançamento',
      message: `Atenção!<br>Deseja realmente EXCLUIR O lançamento <b>${item.Id} - ${item.Titulo}</b>?`,
      confirm: () => {
        this._service.excluirLancamento(item.Id).subscribe({
          next: data => {
            if (data > 0) {
              this.carregarLancamentos();
              this._notification.information({ message: 'Lançamento excluído', duration: 1000 });
            }
          },
          error: err => {
            this.tratarErro(err);
          }
        })
      }
    });
  }

  protected clicouTitulo(item: ILancamento): void {
    this.tableLancamentos.unselectRows();
    this.tableLancamentos.selectRow(item);
  }

  private editarLancamento(item: ILancamento): void {
    this.modalLancamento.showEditModal(item);
  }

  private carregarLancamentos() {
    this.lancamentos_original = [];
    this.lancamentosExibidos = [];
    this.loading = true;
    this._service.getLancamentos().subscribe({
      next: data => {
        this.lancamentos_original = data;
        this.lancamentosExibidos = [...this.lancamentos_original];
        this.filtroLancamentos.filtrarLancamentos(this.lancamentos_original);
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

  protected getTotal(lancamentos: ILancamento[]): string {
    if (lancamentos && lancamentos.length > 0) {
      const saldo = lancamentos[lancamentos.length - 1].SALDO;
      return StrUtils.formatValue(saldo);
    }
    return '';
  }
}

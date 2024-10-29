import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { IOrcamento, IOrcamentoView } from '../_models/IOrcamento';
import { CommonModule } from '@angular/common';
import { ColunaValorComponent } from '../shared/coluna-valor.component';
import { OrcamentoDetailComponent } from './orcamento-detail.component';
import { InputDialogService } from '../shared/input-dialog.service';
import { OrcamentoService } from './orcamento.service';

@Component({
  selector: 'app-orcamento-items-view',
  standalone: true,
  imports: [PoModule, CommonModule, ColunaValorComponent, OrcamentoDetailComponent],
  providers: [InputDialogService],
  templateUrl: './orcamento-items-view.component.html'
})
export class OrcamentoItemsViewComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _dlgModal: InputDialogService,
    private readonly _service: OrcamentoService) {
    super(_notification);
  }

  @ViewChild('modalDetail')
  modalDetail: OrcamentoDetailComponent;

  @Input()
  orcamento: IOrcamentoView;

  @Output()
  onFechouEdicao = new EventEmitter<void>();

  protected readonly colunas: PoTableColumn[] = [
    { label: 'Categoria', property: 'NomeCategoria' },
    { label: 'SubCategoria', property: 'NomeSubCategoria' },
    { label: 'Valor', property: 'Valor', type: 'cellTemplate' },
    { label: 'Descrição', property: 'Descricao' }
  ]

  protected acoesTabela: PoTableAction[] = [
    { label: 'Editar', icon: this.iconeEditar, action: this.abrirModalParaEdicao.bind(this) },
    {
      label: 'Excluir', icon: this.iconeEditar, action: (item: any) => {
        const msg = 'Atenção!<br>' +
          'Deseja realmente excluir o orçamento?<br>' +
          `<strong>Identificador: </strong> ${item.Id}<br>` +
          `<strong>Categoria: </strong> ${item.NomeCategoria}<br>` +
          `<strong>SubCategoria: </strong> ${item.NomeSubCategoria}<br>` +
          `<strong>Valor: </strong> ${item.Valor}`;

        this._dlgModal.confirm({
          message: msg,
          title: 'Exclusão de orçamento',
          confirm: () => this.excluirOrcamento(item)
        });
      }
    }
  ]

  private excluirOrcamento(item: IOrcamento): void {
    this._service.excluirOrcamento(item.Id).subscribe({
      next: data => {
        if (data > 0) {
          this.orcamento.Items = this.orcamento.Items.filter(i => i.Id != item.Id);
          this._notification.success({ message: 'Orçamento excluído com sucesso!', duration: 1500 });
          this.onFechouEdicao.emit();
        }
      },
      error: err => {
        this.tratarErro(err);
      },
      complete: () => { }
    });
  }

  private abrirModalParaEdicao(item: IOrcamento): void {
    this.modalDetail.showEditmodal(item);
  }

  protected fechouModalDetail(): void {
    this.onFechouEdicao.emit();
  }
}

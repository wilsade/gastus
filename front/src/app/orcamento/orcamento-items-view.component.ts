import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { IOrcamento, IOrcamentoView } from '../_models/IOrcamento';
import { CommonModule } from '@angular/common';
import { ColunaValorComponent } from '../shared/coluna-valor.component';
import { OrcamentoDetailComponent } from './orcamento-detail.component';

@Component({
  selector: 'app-orcamento-items-view',
  standalone: true,
  imports: [PoModule, CommonModule, ColunaValorComponent, OrcamentoDetailComponent],
  templateUrl: './orcamento-items-view.component.html'
})
export class OrcamentoItemsViewComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService) {
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
    { label: 'Editar', icon: this.iconeEditar, action: this.abrirModalParaEdicao.bind(this) }
  ]

  private abrirModalParaEdicao(item: IOrcamento): void {
    this.modalDetail.showEditmodal(item);
  }

  protected fechouModalDetail(): void {
    this.onFechouEdicao.emit();
  }
}

import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModalComponent, PoModule, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { IOrcamento } from '../_models/IOrcamento';
import { OrcamentoService } from './orcamento.service';
import { CategoriaControlsComponent } from '../shared/categoria-controls.component';

@Component({
  selector: 'app-orcamento-detail',
  standalone: true,
  imports: [PoModule, FormsModule, CategoriaControlsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './orcamento-detail.component.html'
})
export class OrcamentoDetailComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: OrcamentoService) {
    super(_notification);
  }

  @ViewChild('modal')
  modal: PoModalComponent;

  @ViewChild('categoriaControls')
  categoriaControls: CategoriaControlsComponent;

  meses: PoSelectOption[] = this.getMeses();
  orcamento: IOrcamento = this._service.getEmptyOrcamento();

  showEditmodal(item: IOrcamento): void {
    this.orcamento = item;
    this.categoriaControls.loadSubCategorias(item.IdCategoria, item.IdSubCategoria);
    this.modal.open();
  }

  protected alterouComboMes(numMes: number): void {
    this.orcamento.NumMes = numMes;
  }
}

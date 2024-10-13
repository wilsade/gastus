import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { IOrcamento } from '../_models/IOrcamento';
import { OrcamentoService } from './orcamento.service';

@Component({
  selector: 'app-orcamento-detail',
  standalone: true,
  imports: [PoModule, FormsModule],
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

  orcamento: IOrcamento = this._service.getEmptyOrcamento();

  showEditmodal(item: IOrcamento): void {
    this.orcamento = item;
    this.modal.open();
  }
}

import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { ILancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lancamento-edit',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lancamento-edit.component.html'
})
export class LancamentoEditComponent extends GastusBaseComponent {
  constructor(protected override _notification: PoNotificationService,
    private readonly _service: LancamentoService) {
    super(_notification);
  }

  protected titulo = '';

  @ViewChild('modal')
  protected modal: PoModalComponent;

  @Input()
  lancamento: ILancamento = this._service.getEmptyLancamento();

  showModal(item: ILancamento): void {
    if (item.Id === 0) {
      this.titulo = 'Inclusão de Lançamento';
    } else {
      this.titulo = `Alterar Lançamento: ${item.Id} - ${item.Titulo}`;
    }
    this.lancamento = item;
    this.modal.open();
  }
}

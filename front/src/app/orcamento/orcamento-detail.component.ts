import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { IOrcamento } from '../_models/IOrcamento';
import { OrcamentoService } from './orcamento.service';
import { CategoriaControlsComponent } from '../shared/categoria-controls.component';
import { StrUtils } from '../shared/str-utils';

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

  @Output()
  onFechouModal = new EventEmitter<void>();

  meses: PoSelectOption[] = this.getMeses();
  orcamento: IOrcamento = this._service.getEmptyOrcamento();

  protected readonly confirmou: PoModalAction = {
    label: 'Salvar e fechar',
    disabled: true,
    action: () => {
      this._service.editarOrcamento(this.orcamento).subscribe({
        next: data => {

        },
        error: err => this.tratarErro(err),
        complete: () => this.fecharModal()
      });

    }
  }

  protected readonly cancelou: PoModalAction = {
    label: 'Cancelar',
    action: () => {
      this.fecharModal();
    }
  }

  private fecharModal(): void {
    this.modal.close();
    this.onFechouModal.emit();
  }

  showEditmodal(item: IOrcamento): void {
    this.orcamento = item;
    this.categoriaControls.loadSubCategorias(item.IdCategoria, item.IdSubCategoria);
    this.modal.title = `Alterar item [${item.Id}] de orçamento`;
    this.modal.open();
    this.verificarBotaoSalvar();
  }

  protected alterouComboMes(numMes: number): void {
    this.orcamento.NumMes = numMes;
    this.verificarBotaoSalvar();
  }

  protected alterouValor(valor: number): void {
    this.orcamento.Valor = valor;
    this.verificarBotaoSalvar();
  }

  private verificarBotaoSalvar(): void {
    this.confirmou.disabled = !StrUtils.hasValue(this.orcamento.NumMes) ||
      !StrUtils.hasValue(this.orcamento.Valor);
  }
}

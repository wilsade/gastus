import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoMultiselectOption, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaControlsComponent } from "../shared/categoria-controls.component";
import { StrUtils } from '../shared/str-utils';
import { OrcamentoService } from './orcamento.service';

@Component({
  selector: 'app-orcamento-insercao',
  standalone: true,
  imports: [CommonModule, PoModule, FormsModule, CategoriaControlsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './orcamento-insercao.component.html'
})
export class OrcamentoInsercaoComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: OrcamentoService) {
    super(_notification);
  }

  @ViewChild('modalInsercao')
  protected modalInsercao: PoModalComponent;

  protected orcamentoInsertModel = this._service.createEmptyInsertModel();
  protected listaMeses: PoMultiselectOption[] = this.getMeses();

  protected confirmou: PoModalAction = {
    label: 'Salvar e novo', disabled: true, action: () => this.salvarENovo()
  }

  protected cancelou: PoModalAction = {
    label: 'Cancelar e fechar', action: () => this.fecharModal()
  }

  private salvarENovo(): void {
    this._service.inserirOrcamento(this.orcamentoInsertModel).subscribe({
      next: data => {
        if (data.length > 0) {
          this._notification.success({ message: `${data.length} orçamento(s) inserido(s) com sucesso!`, duration: 2500 });
          this.orcamentoInsertModel = this._service.createEmptyInsertModel();
          this.habilitarBotaoSalvar();
        }
      },
      error: err => {
        this.tratarErro(err);
      },
      complete: () => { }
    });
  }

  private fecharModal(): void {
    this.modalInsercao.close();
  }

  private habilitarBotaoSalvar(): void {
    this.confirmou.disabled = this.orcamentoInsertModel.Valor == 0 ||
      this.orcamentoInsertModel.NumMeses.length == 0 ||
      (!StrUtils.hasValue(this.orcamentoInsertModel.IdCategoria) || this.orcamentoInsertModel.IdCategoria == 0) ||
      (!StrUtils.hasValue(this.orcamentoInsertModel.IdSubCategoria) || this.orcamentoInsertModel.IdSubCategoria == 0)
      ;
  }

  protected alterouMeses(itens: number[]): void {
    this.orcamentoInsertModel.NumMeses = itens;
    this.habilitarBotaoSalvar();
  }

  protected alterouCategorias(item: number): void {
    this.orcamentoInsertModel.IdCategoria = item;
    this.habilitarBotaoSalvar();
  }

  protected alterouSubCategorias(item: number): void {
    this.orcamentoInsertModel.IdSubCategoria = item;
    this.habilitarBotaoSalvar();
  }

  protected alterouValor(valorAlterado: number): void {
    this.orcamentoInsertModel.Valor = valorAlterado;
    this.habilitarBotaoSalvar();
  }

  showInsertModal(): void {
    this.orcamentoInsertModel = this._service.createEmptyInsertModel();
    this.modalInsercao.open();
  }
}

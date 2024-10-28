import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoMultiselectOption, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriaControlsComponent } from "../shared/categoria-controls.component";
import { StrUtils } from '../shared/str-utils';

@Component({
  selector: 'app-orcamento-insercao',
  standalone: true,
  imports: [CommonModule, PoModule, FormsModule, CategoriaControlsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './orcamento-insercao.component.html'
})
export class OrcamentoInsercaoComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService) {
    super(_notification);
  }

  @ViewChild('modalInsercao')
  protected modalInsercao: PoModalComponent;

  protected listaMeses: PoMultiselectOption[] = this.getMeses();
  protected mesesEscolhidos: Array<string> = [];
  protected idCategoria = 0;
  protected idSubCategoria = 0;
  protected valor = 0;
  protected descricao = '';

  protected confirmou: PoModalAction = {
    label: 'Salvar e novo', disabled: true, action: () => this.salvarENovo()
  }

  protected cancelou: PoModalAction = {
    label: 'Cancelar e fechar', action: () => this.fecharModal()
  }

  private salvarENovo(): void {
    console.log(this.mesesEscolhidos);
  }

  private fecharModal(): void {
    this.modalInsercao.close();
  }

  private habilitarBotaoSalvar(): void {
    this.confirmou.disabled = this.valor == 0 ||
      this.mesesEscolhidos.length == 0 ||
      (!StrUtils.hasValue(this.idCategoria) || this.idCategoria == 0) ||
      (!StrUtils.hasValue(this.idSubCategoria) || this.idSubCategoria == 0)
      ;
  }

  protected alterouMeses(itens: string): void {
    this.habilitarBotaoSalvar();
  }

  protected alterouCategorias(item: number): void {
    this.habilitarBotaoSalvar();
  }

  protected alterouSubCategorias(item: number): void {
    this.habilitarBotaoSalvar();
  }

  protected alterouValor(valorAlterado: number): void {
    this.valor = valorAlterado;
    this.habilitarBotaoSalvar();
  }

  showInsertModal(): void {
    this.idCategoria = this.idSubCategoria = 0;
    this.valor = 0;
    this.descricao = '';
    this.modalInsercao.open();
  }
}

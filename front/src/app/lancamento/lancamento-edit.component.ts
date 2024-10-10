import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { ILancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { FormsModule } from '@angular/forms';
import { ComboCategoria } from '../_models/ICategoria';
import { StrUtils } from '../shared/str-utils';

@Component({
  selector: 'app-lancamento-edit',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lancamento-edit.component.html'
})
export class LancamentoEditComponent extends GastusBaseComponent implements OnInit {
  constructor(protected override _notification: PoNotificationService,
    private readonly _service: LancamentoService) {
    super(_notification);
  }

  protected titulo = '';
  protected comboCategorias: ComboCategoria[] = [];
  protected comboSubCategorias: ComboCategoria[] = [];

  @ViewChild('modal')
  protected modal: PoModalComponent;

  @Input()
  lancamento: ILancamento = this._service.getEmptyLancamento();

  protected readonly confirmou: PoModalAction = {
    label: 'Salvar',
    disabled: false,
    action: () => {
      console.log(this.lancamento);
    }
  }

  protected readonly cancelou: PoModalAction = {
    label: 'Cancelar e fechar',
    action: () => {
      this.modal.close();
    }
  }

  ngOnInit(): void {
    this._service.getComboCategorias().subscribe({
      next: data => {
        this.comboCategorias = data;
      },
      error: err => {
        this.tratarErro(err);
      }
    })
  }

  /**
   * Exibe a tela para edição
   * @param item Lançamento
   */
  showEditModal(item: ILancamento): void {
    this.titulo = `Alterar Lançamento: ${item.Id} - ${item.Titulo}`;
    this.lancamento = item;
    const oldSub = this.lancamento.IdSubCategoria;
    this.alterouComboCategoria(this.lancamento.IdCategoria);
    this.lancamento.IdSubCategoria = oldSub;
    this.modal.open();
  }

  protected alterouComboCategoria(item: any): void {
    const categoriaSelecionada = this.comboCategorias.find(c => c.value == item);
    this.comboSubCategorias = [];
    if (categoriaSelecionada) {
      this.comboSubCategorias = categoriaSelecionada.Filhas;
      this.lancamento.IdSubCategoria = 0;
    }
    this.verificarBotaoSalvar();
  }

  protected alterouComboSubCategoria(): void {
    this.verificarBotaoSalvar();
  }

  protected alterouCampo(): void {
    this.verificarBotaoSalvar();
  }

  private verificarBotaoSalvar(): void {
    const dataOk = StrUtils.hasValue(this.lancamento.Data);
    const tituloOK = StrUtils.hasValue(this.lancamento.Titulo);
    const categoriaOK = StrUtils.hasValue(this.lancamento.IdCategoria);
    const subCategoriaOK = StrUtils.hasValue(this.lancamento.IdSubCategoria);
    this.cancelou.disabled = !dataOk || !tituloOK || !categoriaOK || !subCategoriaOK;
  }
}

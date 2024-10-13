import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { ILancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { FormsModule } from '@angular/forms';
import { ComboCategoria } from '../_models/ICategoria';
import { StrUtils } from '../shared/str-utils';
import { TipoTransacaoService } from '../tipo-transacao/tipo-transacao.service';
import { CategoriaService } from '../categoria/categoria.service';

@Component({
  selector: 'app-lancamento-edit',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lancamento-edit.component.html'
})
export class LancamentoEditComponent extends GastusBaseComponent implements OnInit {
  constructor(protected override _notification: PoNotificationService,
    private readonly _service: LancamentoService,
    private readonly _categoriaService: CategoriaService,
    private readonly _tipoTransacaoService: TipoTransacaoService) {
    super(_notification);
  }

  protected titulo = '';
  protected comboCategorias: ComboCategoria[] = [];
  protected comboSubCategorias: PoSelectOption[] = [];
  protected tiposTransacao: PoSelectOption[] = [];

  @ViewChild('modal')
  protected modal: PoModalComponent;

  @Input()
  lancamento: ILancamento = this._service.getEmptyLancamento();

  @Output()
  onModalClosed = new EventEmitter<void>();

  protected readonly confirmou: PoModalAction = {
    label: 'Salvar e fechar',
    disabled: false,
    action: () => {
      if (this.lancamento.Id > 0)
        this.editarLancamento(this.lancamento);
      else
        this.inserirLancamento(this.lancamento);
    }
  }

  protected readonly cancelou: PoModalAction = {
    label: 'Cancelar e fechar',
    action: () => {
      this.fecharModal();
    }
  }

  ngOnInit(): void {
    this._categoriaService.getComboCategorias().subscribe({
      next: data => {
        this.comboCategorias = data;
      },
      error: err => {
        this.tratarErro(err);
      }
    });
    this._tipoTransacaoService.getTiposTransacao().subscribe({
      next: data => {
        this.tiposTransacao = [];
        data.forEach(t => {
          this.tiposTransacao.push({ label: t.Nome, value: t.Id });
        })
      },
      error: err => {
        this.tratarErro(err);
      }
    })
  }

  private fecharModal(): void {
    this.modal.close();
    this.onModalClosed.emit();
  }

  editarLancamento(lancamento: ILancamento): void {
    this._service.editarLancamento(lancamento).subscribe({
      next: data => {
        if (data > 0)
          this._notification.information({ message: 'Lançamento atualizado com sucesso', duration: 1000 });
      },
      error: err => this.tratarErro(err),
      complete: () => this.fecharModal()
    })
  }

  inserirLancamento(lancamento: ILancamento): void {
    this._service.inserirLancamento(lancamento).subscribe({
      next: data => {
        this.lancamento = data;
        this._notification.information({ message: 'Lançamento inserido com sucesso', duration: 1000 });
      },
      error: err => this.tratarErro(err),
      complete: () => this.fecharModal()
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
    this.verificarBotaoSalvar();
  }

  showInsertModal(): void {
    this.lancamento = this._service.getEmptyLancamento();
    this.titulo = 'Inclusão de lançamento';
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
    const valorOK = StrUtils.hasValue(this.lancamento.Valor);
    this.confirmou.disabled = !dataOk || !tituloOK || !categoriaOK || !subCategoriaOK || !valorOK;
  }
}

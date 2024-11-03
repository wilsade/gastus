import { Component, ViewChild } from '@angular/core';
import { PoComboOption, PoModalAction, PoModalComponent, PoModule, PoNotificationService, PoSelectOption, PoStepperComponent, PoTableColumn } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StrUtils } from '../shared/str-utils';
import { IImportarLancamento, ILookupLancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { InputDialogService } from '../shared/input-dialog.service';
import { CategoriaControlsComponent } from "../shared/categoria-controls.component";
import { ColunaValorComponent } from '../shared/coluna-valor.component';
import { TipoTransacaoService } from '../tipo-transacao/tipo-transacao.service';

@Component({
  selector: 'app-importar-lancamentos',
  standalone: true,
  imports: [PoModule, FormsModule, CommonModule, CategoriaControlsComponent, ColunaValorComponent],
  providers: [InputDialogService],
  templateUrl: './importar-lancamentos.component.html'
})
export class ImportarLancamentosComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: LancamentoService,
    private readonly _tipoTransacaoService: TipoTransacaoService,
    private readonly _modalDialog: InputDialogService) {
    super(_notification);
  }

  protected readonly INFORMAR_DADOS = 'Informar dados';
  protected readonly PREENCHER_TABELA = 'Preencher tabela';
  protected readonly FINALIZACAO = 'Finalização';
  readonly TRANSACAO_NULA = 0;

  @ViewChild('modalImportacao')
  protected modalImportacao: PoModalComponent;

  @ViewChild('stepper')
  stepper: PoStepperComponent;

  protected rawLines = '';
  protected dadosImportacao: IImportarLancamento[] = []
  private _lookupByTitulo: ILookupLancamento[] = [];
  protected tiposTransacao: PoSelectOption[] = [];

  protected readonly confirmou: PoModalAction = {
    label: 'Avançar',
    disabled: false,
    action: () => {
      this.stepper.next();
    }
  }

  protected readonly colunasTabela: PoTableColumn[] = [
    { label: '#', property: 'Num' },
    { label: 'Data', property: 'Data' },
    { label: 'Título', property: 'Titulo' },
    { label: 'Valor', property: 'Valor', type: 'cellTemplate' },
    { label: 'Categoria', property: 'NomeCategoria', type: 'cellTemplate' },
    { label: 'SubCategoria', property: 'NomeSubCategoria', type: 'cellTemplate' },
    { label: 'Comentário', property: 'Comentario', type: 'cellTemplate' },
    { label: 'Transação', property: 'NomeTipoTransacao', type: 'cellTemplate' },
  ]

  private loadLookUpByTitulo(): void {
    if (this._lookupByTitulo.length > 0)
      return;
    console.log('iniciando lookup');
    this._service.getLookupByTitulo().subscribe({
      next: data => {
        this._lookupByTitulo = data;
      },
      error: err => this.tratarErro(err)
    })
  }

  private tryGetLookup(titulo: string): ILookupLancamento | undefined {
    const aux = titulo.replace(/[0-9]*\/[0-9]+/g, "")
      .replace(/\s+/g, ' ')
      .trim();

    const achei = this._lookupByTitulo.find(x => x.Titulo == aux);
    return achei;
  }

  private preencherDadosImportacao(): void {
    this.dadosImportacao = [];
    const linhas = this.rawLines.split('\n');
    let num = 1;
    linhas.forEach(linha => {
      linha = linha.replace('DÃBITO', 'DÉBITO');
      if (!StrUtils.hasValue(linha))
        return;

      const itens = linha.split(/[\t;|]/);
      if (itens.length < 3) {
        this.showWarning(`Linha inválida: ${linha}`);
        return;
      }

      const lookup = this.tryGetLookup(itens[1]);
      this.dadosImportacao = [...this.dadosImportacao, {
        Num: num++,
        Data: itens[0],
        Titulo: itens[1],
        Valor: parseFloat(itens[2].replace(',', '.')),
        IdCategoria: lookup ? lookup.IdCategoria : 0,
        NomeCategoria: lookup ? lookup.NomeCategoria : '',
        IdSubCategoria: lookup ? lookup.IdSubCategoria : 0,
        NomeSubCategoria: lookup ? lookup.NomeSubCategoria : '',
        Comentario: lookup ? lookup.Comentario : '',
        IdTipoTransacao: lookup ? lookup.IdTipoTransacao : 0,
        NomeTipoTransacao: lookup ? lookup.NomeTipoTransacao : ''
      }];
    });
  }

  protected alterouStep(step: any): void {
    if (step.label === this.PREENCHER_TABELA)
      this.preencherDadosImportacao();
  }

  protected podeAvancarDosDados(): boolean {
    const ok = StrUtils.hasValue(this.rawLines);
    if (!ok)
      this.showWarning('Informe os dados de importação');
    return ok;
  }

  protected podeAvancarDaTabela(): boolean {
    let camposEmBranco: string[] = [];
    this.dadosImportacao.forEach(x => {
      this.verificarCamposEmBranco(x, camposEmBranco);
    })
    if (camposEmBranco.length > 0) {
      this._notification.warning({
        message: 'Categoria/SubCategoria em branco', supportMessage: camposEmBranco.join(', ')
      });
      return false;
    }
    return true;
  }

  private verificarCamposEmBranco(row: IImportarLancamento, array: string[]): void {
    if (!StrUtils.hasValue(row.NomeCategoria) || !StrUtils.hasValue(row.NomeSubCategoria))
      array.push(`Linha: ${row.Num}`);
  }

  private loadComboTiposTransacao() {
    if (this.tiposTransacao.length > 0)
      return;
    console.log('Carregando tipos de transação');

    this._tipoTransacaoService.getTiposTransacao().subscribe({
      next: data => {
        this.tiposTransacao = [{ label: '< Limpar >', value: this.TRANSACAO_NULA }];
        data.forEach(t => {
          this.tiposTransacao = [...this.tiposTransacao, {
            label: t.Nome, value: t.Id
          }];
        });
      },
      error: err => this.tratarErro(err)
    })
  }

  openModal(): void {
    this.stepper.first();
    this.rawLines = '';
    this.dadosImportacao = [];
    this.loadLookUpByTitulo();
    this.loadComboTiposTransacao();
    this.modalImportacao.open();
  }

}

import { Component, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService, PoSelectOption, PoStepperComponent, PoTableColumn } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StrUtils } from '../shared/str-utils';
import { IImportarLancamento, ILancamento, ILancamentoView, ILookupLancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { InputDialogService } from '../shared/input-dialog.service';
import { CategoriaControlsComponent } from "../shared/categoria-controls.component";
import { ColunaValorComponent } from '../shared/coluna-valor.component';
import { TipoTransacaoService } from '../tipo-transacao/tipo-transacao.service';
import { ICategoria } from '../_models/ICategoria';
import { CategoriaService } from '../categoria/categoria.service';
import { AdminService } from '../admin/admin.service';

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
    private readonly _categoriaService: CategoriaService,
    private readonly _adminService: AdminService,
    private readonly _modalDialog: InputDialogService) {
    super(_notification);
  }

  protected readonly INFORMAR_DADOS = 'Informar dados';
  protected readonly PREENCHER_TABELA = 'Preencher tabela';
  protected readonly VALIDACAO_CONFIRMACAO = 'Validação / Confirmação';
  protected readonly TERMINO = 'Término';
  readonly TRANSACAO_NULA = 0;
  private _saldoAtual: number = 0;

  @ViewChild('modalImportacao')
  protected modalImportacao: PoModalComponent;

  @ViewChild('stepper')
  stepper: PoStepperComponent;

  protected rawLines = '';
  protected dadosImportacao: IImportarLancamento[] = []
  private _lookupByTitulo: ILookupLancamento[] = [];
  protected tiposTransacao: PoSelectOption[] = [];
  private allCategorias: ICategoria[] = [];
  protected lancamentosParaInsercao: ILancamentoView[] = [];
  protected confirmouImportacao = false;

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

  protected readonly colunasConfirmacao: PoTableColumn[] = [
    { label: 'Data', property: 'Data', type: 'date' },
    { label: 'Título', property: 'Titulo' },
    { label: 'Comentário', property: 'Comentario' },
    { label: 'Categoria', property: 'NomeCategoria' },
    { label: 'SubCategoria', property: 'NomeSubCategoria' },
    { label: 'Transação', property: 'NomeTipoTransacao' },
    { label: 'Valor', property: 'Valor', type: 'cellTemplate' },
    { label: 'Saldo', property: 'SALDO', type: 'cellTemplate' },
  ]

  private loadLookUpByTitulo(): void {
    this._service.getLookupByTitulo().subscribe({
      next: data => {
        this._lookupByTitulo = data;
      },
      error: err => this.tratarErro(err)
    })
  }

  private tryGetLookup(titulo: string): ILookupLancamento | undefined {
    const aux = titulo.replace(/\d*\/\d+/g, "")
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
    else if (step.label === this.VALIDACAO_CONFIRMACAO)
      this.criarLancamentosParaInsercao();
  }

  private criarLancamentosParaInsercao(): void {
    console.log('Criando lançamentos para inserção');
    this.lancamentosParaInsercao = [];

    let somaSaldo = this._saldoAtual;
    this.dadosImportacao.forEach(x => {

      somaSaldo += x.Valor;
      const categoria = this.allCategorias.find(c => c.Nome == x.NomeCategoria);
      const subCategoria = categoria!.SubCategorias.find(s => s.Nome == x.NomeSubCategoria);
      this.lancamentosParaInsercao = [...this.lancamentosParaInsercao, {
        Id: 0,
        Data: StrUtils.strToDate(x.Data),
        Titulo: x.Titulo,
        Comentario: x.Comentario,
        IdCategoria: categoria!.Id,
        NomeCategoria: categoria!.Nome,
        IdSubCategoria: subCategoria!.Id,
        NomeSubCategoria: subCategoria!.Nome,
        Valor: x.Valor,
        IdTipoTransacao: x.IdTipoTransacao == this.TRANSACAO_NULA ? null : x.IdTipoTransacao,
        NomeTipoTransacao: x.IdTipoTransacao == this.TRANSACAO_NULA ? '' : x.NomeTipoTransacao,
        SALDO: somaSaldo
      }]
    });
    console.log('lancamentos');
    console.log(this.lancamentosParaInsercao);


  }
  protected podeAvancarDosDados(): boolean {
    const ok = StrUtils.hasValue(this.rawLines);
    if (!ok)
      this.showWarning('Informe os dados de importação');
    return ok;
  }

  protected podeAvancarDaValidacao(): boolean {
    if (!this.confirmouImportacao)
      this.showWarning('Confirme a importação dos lançamentos');
    return this.confirmouImportacao;
  }

  protected podeAvancarDaTabela(): boolean {
    if (this.dadosImportacao.length == 0)
      return false;
    let camposEmBranco: string[] = [];
    let categoriasInvalidas: string[] = [];
    this.dadosImportacao.forEach(x => {
      this.verificarCamposEmBranco(x, camposEmBranco);
      this.validarCategorias(x, categoriasInvalidas);
    })
    if (camposEmBranco.length > 0) {
      this._notification.warning({
        message: 'Categoria/SubCategoria em branco', supportMessage: camposEmBranco.join(', ')
      });
      return false;
    }
    if (categoriasInvalidas.length > 0) {
      this._notification.warning({
        message: 'Categoria/SubCategoria inválida', supportMessage: categoriasInvalidas.join(', ')
      });
      return false;
    }
    return true;
  }

  private validarCategorias(row: IImportarLancamento, categoriasInvalidas: string[]) {
    const categoria = this.allCategorias.find(x => x.Nome == row.NomeCategoria);
    if (!categoria)
      categoriasInvalidas.push(`Linha: ${row.Num} - Categoria: [${row.NomeCategoria}]`);
    else {
      const SubCategoria = categoria.SubCategorias.find(x => x.Nome == row.NomeSubCategoria);
      if (!SubCategoria)
        categoriasInvalidas.push(`Linha: ${row.Num} - SubCategoria: [${row.NomeSubCategoria}]`);
    }
  }

  private verificarCamposEmBranco(row: IImportarLancamento, array: string[]): void {
    if (!StrUtils.hasValue(row.NomeCategoria) || !StrUtils.hasValue(row.NomeSubCategoria))
      array.push(`Linha: ${row.Num}`);
  }

  private loadComboTiposTransacao() {
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

  private loadCategorias(): void {
    this._categoriaService.getCategorias(true).subscribe({
      next: data => {
        this.allCategorias = data;
      },
      error: err => {
        this.tratarErro(err);
      }
    });

  }

  protected getTotal(): string {
    return StrUtils.formatValue(this._saldoAtual);
  }

  private loadSaldoAtual() {
    this._adminService.query("SELECT SUM(VALOR) SALDO FROM LANCAMENTO").subscribe({
      next: data => {
        this._saldoAtual = data[0].SALDO;
        console.log('saldo atual', this._saldoAtual);

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
    this.loadCategorias();
    this.loadSaldoAtual();
    this.modalImportacao.open();
  }



}

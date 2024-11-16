import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateUtils, StrUtils } from '../shared/str-utils';
import { IImportarLancamento, ILancamento, ILancamentoView, ILookupLancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { InputDialogService } from '../shared/input-dialog.service';
import { ColunaValorComponent } from '../shared/coluna-valor.component';
import { TipoTransacaoService } from '../tipo-transacao/tipo-transacao.service';
import { ICategoria } from '../_models/ICategoria';
import { CategoriaService } from '../categoria/categoria.service';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-importar-lancamentos',
  standalone: true,
  imports: [PoModule, FormsModule, CommonModule, ColunaValorComponent],
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

  @ViewChild('modalImportacao')
  protected modalImportacao: PoModalComponent;

  @Output()
  onFechouModal = new EventEmitter<boolean>();

  protected readonly INFORMAR_DADOS = 'Informar dados';
  protected readonly PREENCHER_TABELA = 'Preencher tabela';
  protected readonly VALIDACAO_CONFIRMACAO = 'Validação / Confirmação';
  protected readonly TERMINO = 'Término';

  private readonly AVISO_LOOKUP_3CARACTERES = 'Informe pelo menos 3 caracteres para pesquisar';
  private readonly TRANSACAO_NULA = 0;
  //private readonly AVANCAR = 'Avançar';
  //private readonly IMPORTAR = 'Importar';
  //private readonly FECHAR = 'Fechar';
  private _saldoAtual: number = 0;
  private _lookupByTitulo: ILookupLancamento[] = [];
  private allCategorias: ICategoria[] = [];


  protected abaDadosAtiva = false;
  //protected abaPreencherTabelaAtiva = false;
  protected abaPreencherTabelaDesabilitada = true;
  //protected abaValidacaoDesabilitada = true;
  protected rawLines = '';
  protected dadosImportacao: IImportarLancamento[] = []
  protected tiposTransacao: PoSelectOption[] = [];
  protected lancamentosParaInsercao: ILancamentoView[] = [];
  protected confirmouImportacao = false;
  protected loading = false;
  protected lancamentosInseridos: ILancamento[] = [];
  protected importacao_foi_realizada = false;
  protected ultimoLancamento = '';

  protected readonly confirmou: PoModalAction = {
    label: 'Importar',
    disabled: true,
    action: () => {
      this.processarImportacao();
    }
  }

  protected readonly cancelou: PoModalAction = {
    label: 'Cancelar e fechar',
    action: () => this.fecharModal()
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

  protected clicouAbaPreencherTabela(): void {
    this.preencherDadosImportacao();
  }

  private preencherDadosImportacao(): void {
    if (this.dadosImportacao.length > 0 || this.lancamentosParaInsercao.length > 0) {
      console.log('Já temos dados. Não vamos preencher novamente.');
      return;
    }
    this.dadosImportacao = [];
    const linhas = this.rawLines.split('\n');
    let num = 1;
    linhas.forEach(linha => {
      linha = linha.replace('DÃBITO', 'DÉBITO');
      linha = linha.replace('DÃƒÂ‰BITO', 'DÉBITO');
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
        Data: DateUtils.strToDate(x.Data),
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
  }
  protected podeAvancarDosDados(): boolean {
    const ok = StrUtils.hasValue(this.rawLines);
    if (!ok)
      this.showWarning('Informe os dados de importação');
    return ok;
  }

  protected alterouTipoTransacao(transacaoEscolhida: number, row: IImportarLancamento): void {
    const achei = this.tiposTransacao.find(x => x.value == transacaoEscolhida);
    if (achei)
      row.NomeTipoTransacao = achei.label;
  }

  protected podeAvancarDaValidacao(): boolean {
    if (!this.confirmouImportacao)
      this.showWarning('Confirme a importação dos lançamentos');
    return this.confirmouImportacao;
  }

  // protected clicouAbaValidacao(): void {
  //   this.abaPreencherTabelaAtiva = !this.podeAvancarDaTabela();
  // }

  private podeAvancarDaTabela(): boolean {
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
    this._categoriaService.getCategorias(true, true).subscribe({
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
    const sql = `
      SELECT ID, DATA, TITULO, (SELECT SUM(VALOR) FROM LANCAMENTO) SALDO
      FROM LANCAMENTO
      ORDER BY ID DESC
      LIMIT 1;`

    this._adminService.query(sql).subscribe({
      next: data => {
        const registro = data[0];
        this.ultimoLancamento = `${registro.Id}, ${DateUtils.toBrazilDate(registro.Data)}, ${registro.Titulo}`;
        this._saldoAtual = data[0].SALDO;
      },
      error: err => this.tratarErro(err)
    })
  }

  private processarImportacao(): void {
    this.loading = true;
    this._service.importarLancamentos(this.lancamentosParaInsercao).subscribe({
      next: data => {
        this.lancamentosInseridos = data;
        this.showSuccess(`Total de lançamentos inseridos: ${data.length}`);
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.tratarErro(err);
      },
      complete: () => {
        this.importacao_foi_realizada = true;
        this.cancelou.disabled = true;
        this.modalImportacao.hideClose = true;
      }
    })
  }

  private fecharModal(): void {
    this.modalImportacao.close();
    this.onFechouModal.emit(this.importacao_foi_realizada);
  }

  protected alterouNomeCategoria(row: IImportarLancamento): void {
    row.IdCategoria = 0;
    if (row.NomeCategoria.length >= 3) {
      const acheiCategorias = this.allCategorias.filter(x => x.Nome.startsWithInsensitive(row.NomeCategoria));
      if (acheiCategorias.length > 0) {
        row.IdCategoria = acheiCategorias[0].Id;
        row.NomeCategoria = acheiCategorias[0].Nome;
        row.IdSubCategoria = 0;
        row.NomeSubCategoria = '';
      }
      else {
        const nomesDeCategorias = this.allCategorias.map(x => x.Nome);
        this._modalDialog.alert({ title: 'Categorias disponíveis', message: nomesDeCategorias.join(", ") });
      }
    } else {
      this.showWarning(this.AVISO_LOOKUP_3CARACTERES);
    }
  }

  protected alterouNomeSubCategoria(row: IImportarLancamento): void {
    row.IdSubCategoria = 0;
    if (StrUtils.hasValue(row.NomeCategoria) && row.NomeSubCategoria.length >= 3) {
      const acheiCategoria = this.allCategorias.find(x => x.Nome == row.NomeCategoria);
      if (acheiCategoria) {
        const subcategorias = acheiCategoria.SubCategorias.filter(x => x.Nome.startsWithInsensitive(row.NomeSubCategoria));
        if (subcategorias.length > 0) {
          row.IdSubCategoria = subcategorias[0].Id;
          row.NomeSubCategoria = subcategorias[0].Nome;
        } else {
          const nomes = acheiCategoria.SubCategorias.map(x => x.Nome);
          this._modalDialog.alert({ title: 'SubCategorias disponíveis', message: nomes.join(", ") });
        }
      }
    } else {
      this.showWarning(this.AVISO_LOOKUP_3CARACTERES);
    }
  }

  protected alterouRawLines(): void {
    this.dadosImportacao = [];
    this.lancamentosParaInsercao = [];
    this.abaPreencherTabelaDesabilitada = !StrUtils.hasValue(this.rawLines) ||
      this.rawLines.length < 10;
  }

  protected abaValidacaoDesabilitada(): boolean {
    if (!this.dadosImportacao || this.dadosImportacao.length == 0)
      return true;
    const algumInvalido = this.dadosImportacao.find(x => x.IdCategoria == 0 || x.IdSubCategoria == 0);
    return algumInvalido != null;
  }

  protected getHelpCategoria(row: IImportarLancamento): string {
    if (row.IdCategoria == 0)
      return 'Não informado';
    return ''
  }

  protected getHelpSubCategoria(row: IImportarLancamento): string {
    if (row.IdSubCategoria == 0)
      return 'Não informado';
    return ''
  }

  openModal(): void {
    this.importacao_foi_realizada = false;
    this.cancelou.disabled = false;
    this.modalImportacao.hideClose = false;
    this.confirmou.disabled = true;

    this.abaDadosAtiva = true;
    this.abaPreencherTabelaDesabilitada = true;

    this.rawLines = '';
    this.dadosImportacao = [];
    this.lancamentosParaInsercao = [];

    this.loadLookUpByTitulo();
    this.loadComboTiposTransacao();
    this.loadCategorias();
    this.loadSaldoAtual();

    this.modalImportacao.open();
  }



}

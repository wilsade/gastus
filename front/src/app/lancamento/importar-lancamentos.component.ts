import { Component, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService, PoStepperComponent } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StrUtils } from '../shared/str-utils';
import { IImportarLancamento, ILancamentoView, ILookupLancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';

@Component({
  selector: 'app-importar-lancamentos',
  standalone: true,
  imports: [PoModule, FormsModule, CommonModule],
  templateUrl: './importar-lancamentos.component.html'
})
export class ImportarLancamentosComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: LancamentoService) {
    super(_notification);
  }

  protected readonly INFORMAR_DADOS = 'Informar dados';
  protected readonly PREENCHER_TABELA = 'Preencher tabela';
  protected readonly FINALIZACAO = 'Finalização';

  @ViewChild('modalImportacao')
  protected modalImportacao: PoModalComponent;

  @ViewChild('stepper')
  stepper: PoStepperComponent;

  protected rawLines = '';
  protected dadosImportacao: IImportarLancamento[] = []
  private _lookupByTitulo: ILookupLancamento[] = [];

  protected readonly confirmou: PoModalAction = {
    label: 'Importar',
    disabled: true,
    action: () => {
      console.log('rawLines', this.rawLines);
      const linhas = this.rawLines.split('\n');
      linhas.forEach(linha => {
        linha = linha.replace('DÃBITO', 'DÉBITO');
        const itens = linha.split(/[\t;|]/);
        console.log('itens', itens);
      });
    }
  }

  protected readonly colunasGrid: Array<any> = [
    { property: 'Data', label: 'Data do lançamento', required: true },
    { property: 'Titulo', label: 'Título', required: true },
    { property: 'Valor', label: 'Valor', required: true },
    { property: 'NomeCategoria', label: 'Categoria', required: true },
    { property: 'NomeSubCategoria', label: 'SubCategoria', required: true },
    { property: 'Comentario', label: 'Comentário' },
    { property: 'NomeTipoTransacao', label: 'Tipo de transação' }
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
    linhas.forEach(linha => {
      linha = linha.replace('DÃBITO', 'DÉBITO');
      if (!StrUtils.hasValue(linha))
        return;

      const itens = linha.split(/[\t;|]/);
      if (itens.length < 3) {
        this.showWarning(`Linha inválida: ${linha}`);
        return;
      }

      const titulo = itens[1];
      const lookup = this.tryGetLookup(titulo);

      this.dadosImportacao = [...this.dadosImportacao, {
        Data: itens[0],
        Titulo: itens[1],
        Valor: itens[2],
        NomeCategoria: lookup ? lookup.NomeCategoria : '',
        NomeSubCategoria: lookup ? lookup.NomeSubCategoria : '',
        Comentario: lookup ? lookup.Comentario : '',
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

  openModal(): void {
    this.stepper.first();
    this.rawLines = '';
    this.dadosImportacao = [];
    this.loadLookUpByTitulo();
    this.modalImportacao.open();
  }
}

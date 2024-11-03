import { Component, ViewChild } from '@angular/core';
import { PoGridComponent, PoModalAction, PoModalComponent, PoModule, PoNotificationService, PoStepperComponent } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StrUtils } from '../shared/str-utils';
import { IImportarLancamento, ILookupLancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { InputDialogService } from '../shared/input-dialog.service';
import { CategoriaControlsComponent } from "../shared/categoria-controls.component";

@Component({
  selector: 'app-importar-lancamentos',
  standalone: true,
  imports: [PoModule, FormsModule, CommonModule, CategoriaControlsComponent],
  providers: [InputDialogService],
  templateUrl: './importar-lancamentos.component.html'
})
export class ImportarLancamentosComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: LancamentoService,
    private readonly _modalDialog: InputDialogService) {
    super(_notification);
  }

  protected readonly INFORMAR_DADOS = 'Informar dados';
  protected readonly PREENCHER_TABELA = 'Preencher tabela';
  protected readonly FINALIZACAO = 'Finalização';

  @ViewChild('modalImportacao')
  protected modalImportacao: PoModalComponent;

  @ViewChild('stepper')
  stepper: PoStepperComponent;

  @ViewChild('grid')
  grid: PoGridComponent;

  protected rawLines = '';
  protected dadosImportacao: IImportarLancamento[] = []
  private _lookupByTitulo: ILookupLancamento[] = [];

  protected readonly confirmou: PoModalAction = {
    label: 'Avançar',
    disabled: false,
    action: () => {
      this.stepper.next();
    }
  }

  protected readonly colunasGrid: Array<any> = [
    { property: 'Num', label: '#', readonly: true },
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

      const titulo = itens[1];
      const lookup = this.tryGetLookup(titulo);

      this.dadosImportacao = [...this.dadosImportacao, {
        Num: num++,
        Data: itens[0],
        Titulo: itens[1],
        Valor: itens[2],
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
        message: 'Campos em branco', supportMessage: camposEmBranco.join(', ')
      });
      return false;
    }
    return true;
  }

  private verificarCamposEmBranco(row: IImportarLancamento, array: string[]): void {
    if (!StrUtils.hasValue(row.Data) || !StrUtils.hasValue(row.Titulo) ||
      !StrUtils.hasValue(row.Valor) || !StrUtils.hasValue(row.NomeCategoria) ||
      !StrUtils.hasValue(row.NomeSubCategoria))
      array.push(`Linha: ${row.Num}`);
  }

  openModal(): void {
    this.stepper.first();
    this.rawLines = '';
    this.dadosImportacao = [];
    this.loadLookUpByTitulo();
    this.modalImportacao.open();
  }
}

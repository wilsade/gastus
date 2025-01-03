import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoMultiselectOption, PoSelectOption } from '@po-ui/ng-components';
import { ILancamentoView, TiposPeriodo } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';

@Component({
  selector: 'app-filtro-lancamentos',
  standalone: true,
  imports: [CommonModule, PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './filtro-lancamentos.component.html'
})
export class FiltroLancamentosComponent implements OnInit {

  constructor() { }

  private readonly OUTRAS_COLUNAS_LANCAMENTOS = 'OUTRAS_COLUNAS_LANCAMENTOS';
  private _lancamentosOriginal: ILancamentoView[];
  protected periodos: PoSelectOption[];
  protected periodoSelecionado: number;
  protected filtro = '';
  colunas: Array<string> = [];

  @Input()
  lancamentosFiltrado: ILancamentoView[];

  @Output()
  lancamentosFiltradoChange = new EventEmitter<ILancamentoView[]>();

  @Output()
  colunasAlteradas = new EventEmitter<Array<string>>();

  ngOnInit(): void {
    this.periodos = this.getPeriodoOptions();
    this.alterouPeriodo(TiposPeriodo.Ultimos15Dias.valueOf());

    const colunasArmazenadas = localStorage.getItem(this.OUTRAS_COLUNAS_LANCAMENTOS);
    const colunasArray: string[] = colunasArmazenadas ? JSON.parse(colunasArmazenadas) : [];
    if (colunasArray.length > 0) {
      this.colunas = colunasArray;
      this.colunasAlteradas.emit(this.colunas);
    }
  }

  protected readonly opcoesColunas: PoMultiselectOption[] = [
    { label: 'Id', value: LancamentoService.COLUNA_Id },
    { label: 'Comentário', value: LancamentoService.COLUNA_COMENTARIO },
    { label: 'Tipo', value: LancamentoService.COLUNA_IdTipoTransacao }
  ]

  protected alterouPeriodo(valor: number): void {
    this.periodoSelecionado = valor;
    this.filtrarLancamentos(this._lancamentosOriginal);
  }

  protected alterouColunas(itens: any): void {
    localStorage.setItem(this.OUTRAS_COLUNAS_LANCAMENTOS, JSON.stringify(itens))
    this.colunasAlteradas.emit(itens);
  }

  private getPeriodoOptions(): PoSelectOption[] {
    return Object.keys(TiposPeriodo)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        label: this.formatPeriodoLabel(key),
        value: TiposPeriodo[key as keyof typeof TiposPeriodo]
      }));
  }

  private formatPeriodoLabel(key: string): string {
    switch (key) {
      case 'EsteMes': return 'Este Mês';
      case 'Ultimos7Dias': return 'Últimos 7 dias';
      case 'Ultimos15Dias': return 'Últimos 15 dias';
      case 'Ultimos30Dias': return 'Últimos 30 dias';
      case 'Ultimos90Dias': return 'Últimos 90 dias';
      case 'Todos': return 'Todos';
      default: return key;
    }
  }

  filtrarLancamentos(itens: ILancamentoView[]): void {
    this._lancamentosOriginal = itens;

    if (!this._lancamentosOriginal || this._lancamentosOriginal.length == 0)
      return;

    const hoje = new Date();
    let dataInicio: Date | null = null;

    switch (this.periodoSelecionado) {
      case TiposPeriodo.EsteMes:
        dataInicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
        break;
      case TiposPeriodo.Ultimos7Dias:
        dataInicio = new Date(hoje);
        dataInicio.setDate(hoje.getDate() - 7);
        break;
      case TiposPeriodo.Ultimos15Dias:
        dataInicio = new Date(hoje);
        dataInicio.setDate(hoje.getDate() - 15);
        break;
      case TiposPeriodo.Ultimos30Dias:
        dataInicio = new Date(hoje);
        dataInicio.setDate(hoje.getDate() - 30);
        break;
      case TiposPeriodo.Ultimos90Dias:
        dataInicio = new Date(hoje);
        dataInicio.setDate(hoje.getDate() - 90);
        break;
      case TiposPeriodo.Todos:
      default:
        dataInicio = null;
        break;
    }

    dataInicio?.setHours(0, 0, 0, 0);
    if (dataInicio == null)
      this.lancamentosFiltrado = [...this._lancamentosOriginal];
    else
      this.lancamentosFiltrado = this._lancamentosOriginal.filter(
        (lancamento) => lancamento.Data >= dataInicio
      );

    if (this.filtro) {
      const filtrarPor = this.filtro.trim().toLowerCase();
      this.lancamentosFiltrado = this.lancamentosFiltrado.filter(l =>
        l.Data.toLocaleDateString().includes(filtrarPor) ||
        l.Titulo.toLowerCase().includes(filtrarPor) ||
        l.NomeCategoria.toLowerCase().includes(filtrarPor) ||
        l.NomeSubCategoria.toLowerCase().includes(filtrarPor) ||
        (l.NomeTipoTransacao && l.NomeTipoTransacao.toLowerCase().includes(filtrarPor)) ||
        (l.Comentario && l.Comentario.toLowerCase().includes(filtrarPor))
      );
    }
    this.lancamentosFiltradoChange.emit(this.lancamentosFiltrado);
  }

  protected alterouFiltro(): void {
    this.filtrarLancamentos(this._lancamentosOriginal);
  }

}

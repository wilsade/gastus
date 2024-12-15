import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { RelatoriosService } from './relatorios.service';
import { ColunaValorComponent } from '../shared/coluna-valor.component';
import { StrUtils } from '../shared/str-utils';
import { ILancamentoDeCategoria, ILancamentosPorCategoriaMes } from '../_models/IRelatorios';

@Component({
  selector: 'app-lancamentos-por-categoria-mes',
  standalone: true,
  imports: [PoModule, CommonModule, FormsModule, ColunaValorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lancamentos-por-categoria-mes.component.html',
  styleUrls: ['./lancamentos-por-categoria-mes.component.css']
})
export class LancamentosPorCategoriaMesComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: RelatoriosService) {
    super(_notification);
  }

  loading = false;
  lancamentosPorCategoriaMes: ILancamentosPorCategoriaMes[];

  protected readonly colunas: PoTableColumn[] = [
    { property: 'Nome', label: 'Nome' },
    { property: 'Valor', label: 'Total', type: 'cellTemplate', width: '10%' },
  ]


  ngOnInit(): void {
    this.carregarLancamentosPorCategoriaMes();
  }

  private carregarLancamentosPorCategoriaMes() {
    this.loading = true;
    this._service.getLancamentosPorCategoriaMes().subscribe({
      next: data => {
        this.lancamentosPorCategoriaMes = data;
      },
      error: err => {
        this.loading = false;
        this.tratarErro(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  protected getValor(item: ILancamentoDeCategoria): string {
    if (!item)
      return '';
    if (!item.VALOR_FORMATADO) {
      item.VALOR_FORMATADO = StrUtils.formatValue(item.Valor);
    }
    return item.VALOR_FORMATADO;
  }

  protected getSaldoFinal(item: ILancamentosPorCategoriaMes): string {
    if (!item)
      return '';
    if (!item.TOTAL_FORMATADO) {
      item.TOTAL_FORMATADO = StrUtils.formatValue(item.Total);
    }
    return item.TOTAL_FORMATADO;
  }

}

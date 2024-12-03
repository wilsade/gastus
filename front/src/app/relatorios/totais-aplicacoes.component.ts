import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { RelatoriosService } from './relatorios.service';
import { ColunaValorComponent } from '../shared/coluna-valor.component';
import { StrUtils } from '../shared/str-utils';

@Component({
  selector: 'app-totais-aplicacoes',
  standalone: true,
  imports: [PoModule, CommonModule, FormsModule, ColunaValorComponent],
  templateUrl: './totais-aplicacoes.component.html'
})
export class TotaisAplicacoesComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: RelatoriosService) {
    super(_notification);
  }

  protected loading = false;
  protected totaisAplicacoes: any;
  protected saldoFinal = '';

  protected readonly colunas: PoTableColumn[] = [
    { property: 'Nome', label: 'Nome' },
    { property: 'Valor', label: 'Total', type: 'cellTemplate', width: '10%' },
  ]

  ngOnInit(): void {
    this.carregarTotaisAplicacoes();
  }

  protected carregarTotaisAplicacoes() {
    this.loading = true;
    this._service.getTotaisAplicacoes().subscribe({
      next: data => {
        this.totaisAplicacoes = data;
        this.calcularSaldoFinal();
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

  private calcularSaldoFinal(): void {
    if (!this.totaisAplicacoes)
      return;
    let total = 0;
    this.totaisAplicacoes.forEach((item: any) => {
      total += item.Valor;
    });
    this.saldoFinal = StrUtils.formatValue(total);
  }


}

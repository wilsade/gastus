import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { ColunaValorComponent } from '../shared/coluna-valor.component';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { RelatoriosService } from './relatorios.service';
import { ILancamentoDeCategoria, IRelatPrevistoRealizado } from '../_models/IRelatorios';
import { StrUtils } from '../shared/str-utils';

@Component({
  selector: 'app-previsto-realizado',
  standalone: true,
  imports: [PoModule, CommonModule, FormsModule, ColunaValorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './previsto-realizado.component.html',
  styleUrl: './previsto-realizado.component.css'
})
export class PrevistoRealizadoComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: RelatoriosService) {
    super(_notification);
  }

  protected previstoXrealizado: Array<IRelatPrevistoRealizado> = []
  protected loading = false;

  protected readonly colunasPrevisto: PoTableColumn[] = [
    { property: 'Nome', label: 'Nome' },
    { property: 'Valor', label: 'Valor', type: 'cellTemplate' },
  ]

  ngOnInit(): void {
    this.carregarPrevistoRealizado();
  }

  private carregarPrevistoRealizado() {
    this.loading = true;
    this._service.getPrevistoRealizado().subscribe({
      next: data => {
        console.log(data);
        this.previstoXrealizado = data;
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

  protected getTotalPrevisto(item: IRelatPrevistoRealizado) {
    if (!item)
      return '';
    if (!item.TOTALPREVISTO_FORMATADO)
      item.TOTALPREVISTO_FORMATADO = StrUtils.formatValue(item.TotalPrevisto);
    return item.TOTALPREVISTO_FORMATADO;
  }

  protected getTotalRealizado(item: IRelatPrevistoRealizado) {
    if (!item)
      return '';
    if (!item.TOTALREALIZADO_FORMATADO)
      item.TOTALREALIZADO_FORMATADO = StrUtils.formatValue(item.TotalRealizado);
    return item.TOTALREALIZADO_FORMATADO;
  }

}

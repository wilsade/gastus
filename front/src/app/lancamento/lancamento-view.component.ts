import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { PoModule, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { ILancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lancamento-view',
  standalone: true,
  imports: [CommonModule, PoModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lancamento-view.component.html'
})
export class LancamentoViewComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: LancamentoService) {
    super(_notification);
  }

  loading = false;
  lancamentos: ILancamento[] = [];

  colunas: PoTableColumn[] = [
    this.createColumnId(false),
    { label: 'Data', property: 'Data', type: 'date', format: 'dd/MM/yyyy' },
    { label: 'Título', property: 'Titulo' },
    { label: 'Comentário', property: 'Comentario' },
    { label: 'Categoria', property: 'NomeCategoria' },
    { label: 'SubCategoria', property: 'NomeSubCategoria' },
    { label: 'Tipo', property: 'NomeTipoTransacao' },
    //{ label: 'ValorN', property: 'Valor', type: 'number', format: '1.2-5' },
    { label: 'Valor', property: 'Valor', type: 'cellTemplate' },
    { label: 'Saldo', property: 'SALDO', type: 'cellTemplate' }
  ]

  ngOnInit(): void {
    this.carregarLancamentos();
  }

  private carregarLancamentos() {
    this.loading = true;
    this._service.getLancamentos().subscribe({
      next: data => {
        this.lancamentos = data;
      },
      error: err => {
        this.loading = false;
        this.tratarErro(err);
      },
      complete: () => {
        this.loading = false;
      }
    })
  }

  protected formatValue(item: number): string {
    const formattedValue = item.toFixed(2).replace('.', ',');
    const parts = formattedValue.split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const formattedWithThousands = parts.join(',');

    if (item < 0)
      return `(${formattedWithThousands.replace('-', '')})`;
    else
      return formattedWithThousands;
  }
}

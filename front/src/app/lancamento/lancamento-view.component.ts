import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { PoModule, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { ILancamento } from '../_models/ILancamento';
import { LancamentoService } from './lancamento.service';

@Component({
  selector: 'app-lancamento-view',
  standalone: true,
  imports: [PoModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './lancamento-view.component.html'
})
export class LancamentoViewComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private _service: LancamentoService) {
    super(_notification);
  }

  loading = false;
  lancamentos: ILancamento[] = [];

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
}

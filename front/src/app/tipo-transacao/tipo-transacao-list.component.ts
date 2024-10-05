import { Component, OnInit } from '@angular/core';
import { PoModule, PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { TipoTransacaoService } from './tipo-transacao.service';
import { ITipoTransacao } from '../_models/ITipoTransacao';
import { GastusBaseComponent } from '../shared/gastus-base-component';

@Component({
  selector: 'app-tipo-transacao-list',
  standalone: true,
  imports: [PoModule],
  templateUrl: './tipo-transacao-list.component.html'
})
export class TipoTransacaoListComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: TipoTransacaoService) {
    super(_notification);
  }

  loading = false;
  tiposTransacao: ITipoTransacao[] = [];

  protected readonly colunas: PoTableColumn[] = [
    this.createColumnId(),
    this.createColumnNome()
  ]

  ngOnInit(): void {
    this.carregarTiposTransacao();
  }

  private carregarTiposTransacao() {
    this.loading = true;
    this._service.getTiposTransacao().subscribe({
      next: data => {
        this.tiposTransacao = data;
      },
      error: err => {
        this.tratarErro(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    })
  }
}

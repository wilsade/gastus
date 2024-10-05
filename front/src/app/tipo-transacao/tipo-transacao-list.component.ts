import { Component, OnInit } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { TipoTransacaoService } from './tipo-transacao.service';
import { ITipoTransacao } from '../_models/ITipoTransacao';

@Component({
  selector: 'app-tipo-transacao-list',
  standalone: true,
  imports: [PoModule],
  templateUrl: './tipo-transacao-list.component.html'
})
export class TipoTransacaoListComponent implements OnInit {

  constructor(private readonly _service: TipoTransacaoService) { }

  tiposTransacao: ITipoTransacao[] = [];

  ngOnInit(): void {
    this.carregarTiposTransacao();
  }

  private carregarTiposTransacao() {
    this._service.getTiposTransacao().subscribe({
      next: data => {
        this.tiposTransacao = data;
      },
      error: err => {

      }
    })
  }
}

import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoPageAction, PoTableAction } from '@po-ui/ng-components';
import { InputDialogService } from '../shared/input-dialog.service';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { IOrcamento, IOrcamentoView } from '../_models/IOrcamento';
import { OrcamentoService } from './orcamento.service';
import { OrcamentoDetailComponent } from './orcamento-detail.component';

@Component({
  selector: 'app-orcamento-view',
  standalone: true,
  imports: [CommonModule, PoModule, OrcamentoDetailComponent],
  providers: [InputDialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './orcamento-view.component.html'
})
export class OrcamentoViewComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: OrcamentoService) {
    super(_notification);
  }

  protected orcamentos: IOrcamentoView[] = [];
  protected loading = false;

  @ViewChild('modalDetail')
  modalDetail: OrcamentoDetailComponent;

  protected acoesPagina: PoPageAction[] = [
    {
      label: 'Atualizar', icon: this.iconeAtualizar,
      action: () => this.carregarOrcamentos()
    },
    { label: 'Inserir', icon: this.iconeInserir, action: () => this.abrirModalParaInsercao() }
  ]

  protected acoesTabela: PoTableAction[] = [
    { label: 'Editar', icon: this.iconeEditar, action: this.abrirModalParaEdicao.bind(this) }
  ]

  ngOnInit(): void {
    this.carregarOrcamentos();
  }

  private abrirModalParaInsercao(): void {
    console.log('nao implementado');

  }

  private abrirModalParaEdicao(item: IOrcamento): void {
    this.modalDetail.showEditmodal(item);
  }

  private carregarOrcamentos() {
    this.loading = true;
    this._service.getOrcamentos().subscribe({
      next: data => {
        this.orcamentos = data;
      },
      error: err => {
        this.loading = false;
        this.tratarErro(err);
      },
      complete: () => this.loading = false
    })
  }

}

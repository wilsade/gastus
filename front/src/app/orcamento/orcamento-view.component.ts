import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { InputDialogService } from '../shared/input-dialog.service';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { IOrcamentoView } from '../_models/IOrcamento';
import { OrcamentoService } from './orcamento.service';
import { OrcamentoItemsViewComponent } from './orcamento-items-view.component';
import { StrUtils } from '../shared/str-utils';
import { OrcamentoInsercaoComponent } from "./orcamento-insercao.component";

@Component({
  selector: 'app-orcamento-view',
  standalone: true,
  imports: [CommonModule, PoModule, OrcamentoItemsViewComponent, OrcamentoInsercaoComponent],
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

  @ViewChild('modalInsercao')
  modalInsercao: OrcamentoInsercaoComponent;

  protected acoesPagina: PoPageAction[] = [
    {
      label: 'Atualizar', icon: this.iconeAtualizar,
      action: () => this.carregarOrcamentos()
    },
    { label: 'Inserir', icon: this.iconeInserir, action: () => this.abrirModalParaInsercao() }
  ]

  ngOnInit(): void {
    this.carregarOrcamentos();
  }

  private abrirModalParaInsercao(): void {
    this.modalInsercao.showInsertModal();
  }

  private carregarOrcamentos() {
    this.loading = true;
    this._service.getOrcamentos().subscribe({
      next: data => {
        this.preencherNomeMes(data);
        this.orcamentos = data;
      },
      error: err => {
        this.loading = false;
        this.tratarErro(err);
      },
      complete: () => this.loading = false
    })
  }

  private preencherNomeMes(data: IOrcamentoView[]) {
    const meses = this.getMeses();
    data.forEach(o => {
      const acheiMes = meses.find(x => x.value == o.NumMes);
      if (acheiMes)
        o.NOMEMES = acheiMes.label;
      else
        o.NOMEMES = o.NumMes.toString();
    })
  }

  protected fechouModalDetail(): void {
    this.carregarOrcamentos();
  }

  protected getTotal(valor: number): string {
    return StrUtils.formatValue(valor);
  }

  protected fechouModal(): void {
    this.carregarOrcamentos();
  }

}

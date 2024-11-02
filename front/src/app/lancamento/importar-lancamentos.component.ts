import { Component, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StrUtils } from '../shared/str-utils';
import { IImportarLancamento } from '../_models/ILancamento';

@Component({
  selector: 'app-importar-lancamentos',
  standalone: true,
  imports: [PoModule, FormsModule, CommonModule],
  templateUrl: './importar-lancamentos.component.html'
})
export class ImportarLancamentosComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService) {
    super(_notification);
  }

  protected readonly INFORMAR_DADOS = 'Informar dados';
  protected readonly PREENCHER_TABELA = 'Preencher tabela';
  protected readonly FINALIZACAO = 'Finalização';

  @ViewChild('modalImportacao')
  protected modalImportacao: PoModalComponent;

  protected rawLines = '';
  protected dadosImportacao: IImportarLancamento[] = []

  protected readonly confirmou: PoModalAction = {
    label: 'Importar',
    disabled: true,
    action: () => {
      console.log('rawLines', this.rawLines);
      const linhas = this.rawLines.split('\n');
      linhas.forEach(linha => {
        linha = linha.replace('DÃBITO', 'DÉBITO');
        const itens = linha.split(/[\t;|]/);
        console.log('itens', itens);
      });
    }
  }

  protected readonly colunasGrid: Array<any> = [
    { property: 'Data', label: 'Data do lançamento' },
    { property: 'Titulo', label: 'Título' },
    { property: 'Valor', label: 'Valor' },
    { property: 'NomeCategoria', label: 'Categoria' },
    { property: 'NomeSubCategoria', label: 'SubCategoria' },
    { property: 'Comentario', label: 'Comentário' }
  ]

  private preencherDadosImportacao(): void {
    this.dadosImportacao = [];
    const linhas = this.rawLines.split('\n');
    linhas.forEach(linha => {
      linha = linha.replace('DÃBITO', 'DÉBITO');
      const itens = linha.split(/[\t;|]/);

      this.dadosImportacao = [...this.dadosImportacao, {
        Data: itens[0],
        Titulo: itens[1],
        Valor: itens[2],
        NomeCategoria: '',
        NomeSubCategoria: '',
        Comentario: ''
      }];
    });
  }

  protected alterouStep(step: any): void {
    if (step.label === this.PREENCHER_TABELA)
      this.preencherDadosImportacao();
  }

  protected podeAvancarDosDados(): boolean {
    const ok = StrUtils.hasValue(this.rawLines);
    if (!ok)
      this.showWarning('Informe os dados de importação');
    return ok;
  }

  openModal(): void {
    this.modalImportacao.open();
  }
}

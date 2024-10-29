import { Component, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-importar-lancamentos',
  standalone: true,
  imports: [PoModule, FormsModule],
  templateUrl: './importar-lancamentos.component.html'
})
export class ImportarLancamentosComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService) {
    super(_notification);
  }

  @ViewChild('modalImportacao')
  protected modalImportacao: PoModalComponent;

  protected rawLines = '';

  protected readonly confirmou: PoModalAction = {
    label: 'Importar',
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

  openModal(): void {
    this.modalImportacao.open();
  }
}

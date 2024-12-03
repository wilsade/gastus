import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoNotificationService } from '@po-ui/ng-components';
import { GastusBaseComponent } from '../shared/gastus-base-component';

@Component({
  selector: 'app-totais-aplicacoes',
  standalone: true,
  imports: [PoModule, CommonModule, FormsModule],
  templateUrl: './totais-aplicacoes.component.html'
})
export class TotaisAplicacoesComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService) {
    super(_notification);
  }
}

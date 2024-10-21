import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoModule, PoNotificationService } from '@po-ui/ng-components';

import { GastusBaseComponent } from '../shared/gastus-base-component';
import { AdminService } from './admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-sql',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-sql.component.html'
})
export class AdminSqlComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: AdminService) {
    super(_notification);
  }

  readonly QUERY = 'Consultar';
  readonly EXECTUCE = 'Executar';

  protected codigoSQL = '';
  protected labelBotao = this.QUERY;
  protected botaoDesabilitado = true;
  protected query = [];

  protected alterouCodigoSQL(): void {
    this.labelBotao = this.QUERY;
    if (!this.codigoSQL || this.codigoSQL.length <= 3) {
      this.botaoDesabilitado = true;
      return;
    }
    if (this.codigoSQL.toLowerCase().startsWith('select')) {
      this.labelBotao = this.QUERY;
      this.botaoDesabilitado = false;
    } else {
      this.labelBotao = this.EXECTUCE;
      this.botaoDesabilitado = false;
    }
  }

  protected queryClick(): void {
    this._service.query(this.codigoSQL).subscribe({
      next: data => {
        this.query = data;
      },
      error: err => this.tratarErro(err)
    })
  }
}

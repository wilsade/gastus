import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PoModule, PoNotificationService } from '@po-ui/ng-components';

import { GastusBaseComponent } from '../shared/gastus-base-component';
import { PoCodeEditorModule } from '@po-ui/ng-code-editor';
import { AdminService } from './admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-sql',
  standalone: true,
  imports: [PoModule, PoCodeEditorModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-sql.component.html'
})
export class AdminSqlComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: AdminService) {
    super(_notification);
  }

  protected codigo = '';
  protected query = [];

  protected queryClick(): void {
    this._service.query(this.codigo).subscribe({
      next: data => {
        this.query = data;
      },
      error: err => this.tratarErro(err)
    })
  }
}

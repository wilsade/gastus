import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';

import { GastusBaseComponent } from '../shared/gastus-base-component';
import { AdminService } from './admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-sql',
  standalone: true,
  imports: [PoModule, FormsModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin-sql.component.html'
})
export class AdminSqlComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: AdminService) {
    super(_notification);
  }

  @ViewChild('minhaTabela')
  minhaTabela: PoTableComponent;

  protected readonly QUERY = 'Consultar';
  protected readonly EXECTUCE = 'Executar';
  protected loading = false;

  protected codigoSQL = '';
  protected labelBotao = this.QUERY;
  protected botaoDesabilitado = true;
  protected query = [];

  protected colunas: PoTableColumn[] = [];

  private gerarColunas(resultado: any[]): PoTableColumn[] {
    if (resultado.length === 0)
      return [];

    return Object.keys(resultado[0]).map(key => ({
      property: key,
      label: key.charAt(0).toUpperCase() + key.slice(1)
    }));
  }

  protected alterouCodigoSQL(): void {
    this.labelBotao = this.QUERY;
    this.botaoDesabilitado = true;
    if (!this.codigoSQL)
      return;

    if (this.codigoSQL.toLowerCase().startsWith('select')) {
      this.labelBotao = this.QUERY;
      this.botaoDesabilitado = false;
    } else if (this.codigoSQL.toLowerCase().startsWith('insert') ||
      this.codigoSQL.toLowerCase().startsWith('update') ||
      this.codigoSQL.toLowerCase().startsWith('delete')) {
      this.labelBotao = this.EXECTUCE;
      this.botaoDesabilitado = false;
    }
  }

  protected queryClick(): void {
    this.loading = true;
    this._service.query(this.codigoSQL).subscribe({
      next: data => {
        this.colunas = this.gerarColunas(data);
        this.query = data;
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.tratarErro(err);
      }
    })
  }
}

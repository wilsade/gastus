import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { PoDialogService, PoModule, PoNotificationService, PoTableColumn, PoTableComponent } from '@po-ui/ng-components';

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
    private readonly _service: AdminService,
    private readonly _dlgModal: PoDialogService) {
    super(_notification);
  }

  @ViewChild('minhaTabela')
  minhaTabela: PoTableComponent;

  protected readonly QUERY = 'Consultar';
  protected readonly EXECUTE = 'Executar';
  protected loading = false;

  protected codigoSQL = '';
  protected labelBotao = this.QUERY;
  protected botaoDesabilitado = true;
  protected query = [];

  protected colunas: PoTableColumn[] = [];

  private isSelect(): boolean {
    return this.labelBotao === this.QUERY;
  }

  private isExecute(): boolean {
    return this.labelBotao === this.EXECUTE;
  }

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

    if (this.codigoSQL.startsWithInsensitive('select')) {
      this.labelBotao = this.QUERY;
      this.botaoDesabilitado = false;
    } else if (this.codigoSQL.startsWithInsensitive('insert') ||
      this.codigoSQL.startsWithInsensitive('update') ||
      this.codigoSQL.startsWithInsensitive('delete')) {
      this.labelBotao = this.EXECUTE;
      this.botaoDesabilitado = false;
    }
  }

  private rodarSQLSelect(): void {
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

  private rodarSQLExecute(): void {
    this.loading = true;
    this._service.execute(this.codigoSQL).subscribe({
      next: data => {
        this._notification.success({ message: `Total de registros afetados: ${data}`, duration: 5000 });
        this.loading = false;
      },
      error: err => {
        this.loading = false;
        this.tratarErro(err);
      }
    })
  }

  protected queryClick(): void {
    if (this.labelBotao === this.QUERY)
      this.rodarSQLSelect();
    else
      this._dlgModal.confirm({
        title: 'Alteração no banco de dados',
        message: 'Deseja realmente executar este comando SQL no banco de dados?',
        confirm: () => this.rodarSQLExecute()
      });
  }
}

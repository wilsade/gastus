import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { CategoriaService } from './categoria.service';
import { ICategoria } from '../_models/ICategoria';
import { CategoriaEditComponent } from "./categoria-edit.component";
import { InputDialogService } from '../shared/input-dialog.service';
import { GastusBaseComponent } from '../shared/gastus-base-component';
import { CommonModule } from '@angular/common';
import { SubcategoriaComponent } from './subcategoria.component';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [PoModule, CommonModule, CategoriaEditComponent, SubcategoriaComponent],
  providers: [InputDialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: CategoriaService,
    private readonly _modalDlg: InputDialogService) {
    super(_notification);
  }

  loading = false;
  categorias: Array<ICategoria>;

  protected readonly colunas: PoTableColumn[] = [
    { label: 'Id.', property: 'Id', width: '10%' },
    { label: 'Nome', property: 'Nome' },
    { label: 'Receita', property: 'IndicaReceita', type: 'cellTemplate', width: '10%' },
    { label: 'Relatório', property: 'SaiNoRelatorio', type: 'cellTemplate', width: '10%' },
  ]

  protected readonly acoesPagina: PoPageAction[] = [
    {
      label: 'Atualizar', icon: this.iconeAtualizar,
      action: () => this.ngOnInit()
    },
    {
      label: 'Inserir', icon: this.iconeInserir,
      action: () => this.inserirCategoria_Click()
    }
  ]

  protected readonly acoesTabela: PoTableAction[] = [
    { label: 'Editar', icon: this.iconeEditar, action: this.editarCategoria.bind(this) },
    { label: 'Excluir', icon: this.iconeExcluir, action: this.excluirCategoria.bind(this) }
  ]

  @ViewChild('modalCategoria', { static: false })
  modalCategoria: CategoriaEditComponent

  ngOnInit() {
    this.loading = true;
    this._service.getCategorias(true).subscribe({
      next: data => {
        this.categorias = data;
      },
      error: err => {
        this.tratarErro(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private inserirCategoria_Click(): void {
    this._modalDlg.showInput({
      title: 'Inserção de Categoria',
      label: 'Informe o nome da nova Categoria',
      onConfirm: (valor: string) => {
        this._service.inserirCategoria(valor).subscribe({
          next: data => {
            this.categorias = [...this.categorias, data];
          },
          error: err => {
            this.tratarErro(err);
          }
        })
      }
    })
  }

  private editarCategoria(item: ICategoria): void {
    this.modalCategoria.exibirModal(item);
  }

  private excluirCategoria(item: ICategoria): void {
    this._modalDlg.confirm({
      title: 'Exclusão de Categoria',
      message: `Atenção!<br>Deseja realmente EXCLUIR a Categoria <b>${item.Nome}</b>?`,
      confirm: () => {
        this._service.excluirCategoria(item.Id).subscribe({
          next: data => {
            if (data > 0)
              this.categorias = this.categorias.filter(cat => cat.Id !== item.Id);
          },
          error: err => {
            this.tratarErro(err);
          }
        })
      }
    });
  }

  protected categoriaAlterada(item: ICategoria): void {
    this._service.editarCategoria(item).subscribe({
      next: data => {
        this.ngOnInit();
      },
      error: err => {
        this.tratarErro(err);
      },
      complete: () => {
      }
    });
  }
}

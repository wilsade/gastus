import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModule, PoNotificationService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { CategoriaService } from './categoria.service';
import { ICategoria } from '../_models/ICategoria';
import { CategoriaEditComponent } from "./categoria-edit.component";
import { InputDialogService } from '../shared/input-dialog.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [PoModule, CategoriaEditComponent],
  providers: [InputDialogService],
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  constructor(private readonly _service: CategoriaService, private readonly _modalDlg: InputDialogService,
    private readonly _notification: PoNotificationService) { }

  categorias: Array<ICategoria>;

  protected readonly colunas: PoTableColumn[] = [
    { label: 'Id.', property: 'Id', width: '10%' },
    { label: 'Nome', property: 'Nome' }
  ]

  protected readonly acoesPagina: PoPageAction[] = [
    {
      label: 'Atualizar', icon: 'ph-fill ph-arrows-clockwise',
      action: () => this.ngOnInit()
    },
    {
      label: 'Inserir Categoria', icon: 'ph-fill ph-plus-square',
      action: () => this.inserirCategoria_Click()
    }
  ]

  protected readonly acoesTabela: PoTableAction[] = [
    { label: 'Editar', icon: 'ph-fill ph-pencil-simple', action: this.editarCategoria.bind(this) },
    { label: 'Excluir', icon: 'ph-fill ph-minus-circle', action: this.excluirCategoria.bind(this) }
  ]

  @ViewChild('modalCategoria', { static: false })
  modalCategoria: CategoriaEditComponent

  ngOnInit() {
    this._service.getCategorias().subscribe({
      next: data => {
        this.categorias = data;
      },
      error: err => {
        console.error(err);
      },
      complete: () => {

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
            console.error(err);
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
            console.log('o que eu exclui?', data);
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

  private tratarErro(err: HttpErrorResponse): void {
    let msg = err.message;
    if (err.error?.error)
      msg = err.error.error;
    this._notification.error(msg);
  }

  protected categoriaAlterada(item: ICategoria): void {
    this._service.editarCategoria(item).subscribe({
      next: data => {
        this.ngOnInit();
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
      }
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModule, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { CategoriaService } from './categoria.service';
import { ICategoria } from '../_models/ICategoria';
import { CategoriaEditComponent } from "./categoria-edit.component";

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [PoModule, CategoriaEditComponent],
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  constructor(private readonly _service: CategoriaService) { }

  categorias: Array<ICategoria>;
  //categoriaEscolhida: ICategoria = this._service.getEmptyCategoria();

  protected readonly colunas: PoTableColumn[] = [
    { label: 'Id.', property: 'Id', width: '10%' },
    { label: 'Nome', property: 'Nome' }
  ]

  protected readonly acoesTabela: PoTableAction[] = [
    { label: 'Editar', action: this.editarCategoria.bind(this) }
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

  private editarCategoria(item: ICategoria): void {
    //this.categoriaEscolhida = item;
    this.modalCategoria.exibirModal(item);
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

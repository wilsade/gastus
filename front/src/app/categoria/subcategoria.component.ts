import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { InputBoxComponent } from '../shared/input-box.component';
import { ICategoria, ISubCategoria } from '../_models/ICategoria';
import { CategoriaService } from './categoria.service';

@Component({
  selector: 'app-subcategoria',
  standalone: true,
  imports: [PoModule, FormsModule, InputBoxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './subcategoria.component.html'
})
export class SubcategoriaComponent {

  constructor(private _service: CategoriaService) { }

  private _subCategoriaAtual: ISubCategoria;

  @Input()
  categoria: ICategoria;

  @ViewChild('inputBoxInserir')
  inputBoxInserir: InputBoxComponent

  @ViewChild('inputBoxEditar')
  inputBoxEditar: InputBoxComponent

  protected colunas: Array<PoTableColumn> = [
    { label: 'Id', property: 'Id', width: '10%' },
    { label: 'Nome', property: 'Nome' },
  ]

  protected acoesTabela: Array<PoTableAction> = [
    { label: 'Editar', icon: 'ph-fill ph-pencil-simple', action: this.editar_Click.bind(this) },
    { label: 'Excluir', icon: 'ph-fill ph-minus-circle' }
  ]

  protected inserirSubCategoria_Click(): void {
    this.inputBoxInserir.valor = '';
    this.inputBoxInserir.showInputBox();
  }

  protected confirmouInsercaoNomeSubCategoria(nome: string): void {
    this._service.inserirSubCategoria(this.categoria.Id, nome).subscribe({
      next: data => {
        this.categoria.SubCategorias = [...this.categoria.SubCategorias, data];
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
      }
    });
  }

  private editar_Click(subCategoria: ISubCategoria): void {
    this._subCategoriaAtual = subCategoria;
    this.inputBoxEditar.valor = subCategoria.Nome;
    this.inputBoxEditar.showInputBox();
  }

  protected confirmouEdicaoNomeSubCategoria(nome: string): void {
    this._subCategoriaAtual.Nome = nome;
    this._service.editarSubCategoria(this._subCategoriaAtual).subscribe({
      next: data => {
        console.log('resposta da api', data);

      },
      error: err => {
        console.error(err);
      },
      complete: () => {
      }
    });
  }

}

import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoDialogService, PoModule, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
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

  constructor(private readonly _service: CategoriaService, private readonly _dialog: PoDialogService) { }

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
    { label: 'Excluir', icon: 'ph-fill ph-minus-circle', action: this.excluir_Click.bind(this) }
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

  private excluir_Click(subCategoria: ISubCategoria): void {
    let excluir = false;
    this._dialog.confirm({
      title: 'Exclusão de SubCategoria',
      message: `Atenção!<br>Deseja realmente EXCLUIR a subcategoria <b>${subCategoria.Nome}</b>?`,
      confirm: () => {
        excluir = true;
      }
    });

    if (!excluir)
      return;

    this._service.excluirSubCategoria(this.categoria.Id, subCategoria.Id).subscribe({
      next: data => {
        this.categoria.SubCategorias = this.categoria.SubCategorias.filter(sub => sub.Id !== subCategoria.Id);
      },
      error: err => {
        console.error(err);
      },
      complete: () => {

      }
    });
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

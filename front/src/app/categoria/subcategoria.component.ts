import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoTableColumn } from '@po-ui/ng-components';
import { InputBoxComponent } from '../shared/input-box.component';
import { ICategoria } from '../_models/ICategoria';
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

  @Input()
  categoria: ICategoria;

  @ViewChild('inputBox')
  inputBox: InputBoxComponent

  protected colunas: Array<PoTableColumn> = [
    { label: 'Id', property: 'Id', width: '10%' },
    { label: 'Nome', property: 'Nome' },
  ]

  protected inserirSubCategoria_Click(): void {
    this.inputBox.showInputBox();
  }

  protected confirmouNomeSubCategoria(nome: string): void {
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

}

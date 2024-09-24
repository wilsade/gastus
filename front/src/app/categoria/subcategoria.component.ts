import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoTableColumn } from '@po-ui/ng-components';
import { InputBoxComponent } from '../shared/input-box.component';
import { ISubCategoria } from '../_models/ICategoria';

@Component({
  selector: 'app-subcategoria',
  standalone: true,
  imports: [PoModule, FormsModule, InputBoxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './subcategoria.component.html'
})
export class SubcategoriaComponent {

  @Input()
  subcategorias: ISubCategoria[] = [];

  @ViewChild('inputBox')
  inputBox: InputBoxComponent

  protected colunas: Array<PoTableColumn> = [
    { label: 'Id', property: 'Id', width: '10%' },
    { label: 'Nome', property: 'Nome' },
  ]

  protected inserirSubCategoria_Click(): void {
    this.inputBox.showInputBox();
  }

}

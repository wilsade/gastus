import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PoModalComponent, PoModule } from '@po-ui/ng-components';
import { ICategoria } from '../_models/ICategoria';
import { CategoriaService } from './categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-edit',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './categoria-edit.component.html',
  styleUrl: './categoria-edit.component.css'
})
export class CategoriaEditComponent {

  constructor(private _service: CategoriaService) { }

  @ViewChild('modal')
  modal: PoModalComponent;

  @Input()
  categoria: ICategoria;

  @Output()
  categoriaChange = new EventEmitter<ICategoria>();

  meuTitulo: string;

  exibirModal(): void {
    this.modal.open();
  }

  protected alterouNome(): void {
    this.categoriaChange.emit(this.categoria);
  }
}

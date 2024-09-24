import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule } from '@po-ui/ng-components';
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

  protected confirmouModal: PoModalAction = {
    label: 'Confirmar',
    action: () => {
      console.log('salvar tudo');
      this.modal.close();
    }
  }

  protected cancelouModal: PoModalAction = {
    label: 'Cancelar',
    action: () => {
      this.modal.close();
    }
  }

  @ViewChild('modal')
  modal: PoModalComponent;

  @Input()
  categoria: ICategoria;

  @Output()
  categoriaChange = new EventEmitter<ICategoria>();

  protected meuTitulo: string;

  exibirModal(nome: string): void {
    this.meuTitulo = `Editar categoria: ${nome}`;
    this.modal.open();
  }

  protected alterouNome(): void {
    this.categoriaChange.emit(this.categoria);
  }
}

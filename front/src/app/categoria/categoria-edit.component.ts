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
      console.log('salvar tudo', this.categoria);
      this.onConfirmouModal.emit(this.categoria);
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

  //@Input()
  protected categoria: ICategoria = this._service.getEmptyCategoria();

  //@Output()
  //categoriaChange = new EventEmitter<ICategoria>();

  @Output()
  onConfirmouModal = new EventEmitter<ICategoria>();

  protected meuTitulo: string;

  exibirModal(item: ICategoria): void {
    this.categoria = { Id: item.Id, Nome: item.Nome };
    this.meuTitulo = `Editar categoria: ${item.Nome}`;
    this.modal.open();
  }
}

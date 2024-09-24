import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoTableColumn } from '@po-ui/ng-components';
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

  protected colunas: Array<PoTableColumn> = [
    { label: 'Id', property: 'Id', width: '10%' },
    { label: 'Nome', property: 'Nome' },
  ]

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
    this.meuTitulo = `Editar categoria: ${item.Nome}`;
    this.modal.open();
    this.loadCategoria(item);
  }

  private loadCategoria(item: ICategoria): void {
    this._service.getCategoriaById(item.Id).subscribe({
      next: data => {
        this.categoria = data;
      },
      error: err => {
        console.error(err);
      },
      complete: () => {

      }
    });
  }

  protected inserirSubCategoria_Click(): void {
    console.log('inserirSubCategoria_Click');

  }
}

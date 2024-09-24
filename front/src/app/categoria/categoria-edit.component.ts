import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PoGridRowActions, PoModalAction, PoModalComponent, PoModule } from '@po-ui/ng-components';
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

  protected colunas: Array<any> = [
    { label: 'Id', property: 'Id', readonly: true },
    { label: 'Nome', property: 'Nome', required: true, width: '300' },
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

  protected rowActions: PoGridRowActions = {
    beforeSave: this.onBeforeSave.bind(this),
    afterSave: this.onAfterSave.bind(this),
    beforeRemove: this.onBeforeRemove.bind(this),
    afterRemove: this.onAfterRemove.bind(this),
    beforeInsert: this.onBeforeInsert.bind(this)
  };

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

  private onBeforeSave(row: any, old: any) {
    if (!row.Nome)
      alert('Nome da subcategoria obrigatório')

    const achou = this.categoria.SubCategorias.find(x => x.Nome == row.Nome);
    console.log('achou', achou);

    return row.Nome;
  }

  private onAfterSave(row: any) {
    console.log('onAfterSave(new): ', row);
  }

  private onBeforeRemove(row: any) {
    console.log('onBeforeRemove: ', row);

    return true;
  }

  private onAfterRemove() {
    console.log('onAfterRemove: ');
  }

  private onBeforeInsert(row: any) {
    console.log('onBeforeInsert: ', row);

    return true;
  }
}

import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { ICategoria } from '../_models/ICategoria';
import { CategoriaService } from './categoria.service';
import { FormsModule } from '@angular/forms';
import { SubcategoriaComponent } from "./subcategoria.component";
import { GastusBaseComponent } from '../shared/gastus-base-component';

@Component({
  selector: 'app-categoria-edit',
  standalone: true,
  imports: [PoModule, FormsModule, SubcategoriaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './categoria-edit.component.html'
})
export class CategoriaEditComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: CategoriaService) {
    super(_notification);
  }

  private _nomeOriginal: string;

  protected confirmouModal: PoModalAction = {
    label: 'Salvar e fechar',
    action: () => {
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

  protected categoria: ICategoria = this._service.getEmptyCategoria();

  @Output()
  onConfirmouModal = new EventEmitter<ICategoria>();

  protected meuTitulo: string;

  exibirModal(item: ICategoria): void {
    this._nomeOriginal = item.Nome;
    this.meuTitulo = `Editar categoria: ${item.Nome}`;
    this.modal.open();
    this.loadCategoria(item);
  }

  protected alterouNomeCategoria(): void {
    this.confirmouModal.disabled = this._nomeOriginal === this.categoria.Nome;
  }

  private loadCategoria(item: ICategoria): void {
    this._service.getCategoriaById(item.Id).subscribe({
      next: data => {
        this.categoria = data;
      },
      error: err => {
        this.tratarErro(err);
      },
      complete: () => {
      }
    });
  }
}

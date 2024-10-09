import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModule, PoNotificationService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { ICategoria, ISubCategoria } from '../_models/ICategoria';
import { CategoriaService } from './categoria.service';
import { InputDialogService } from '../shared/input-dialog.service';
import { GastusBaseComponent } from '../shared/gastus-base-component';

@Component({
  selector: 'app-subcategoria',
  standalone: true,
  imports: [PoModule, FormsModule],
  providers: [InputDialogService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './subcategoria.component.html'
})
export class SubcategoriaComponent extends GastusBaseComponent {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: CategoriaService,
    private readonly _dialog: InputDialogService) {
    super(_notification);
  }

  @Input()
  categoria: ICategoria;

  protected colunas: Array<PoTableColumn> = [
    { label: 'Id', property: 'Id', width: '10%' },
    { label: 'Nome', property: 'Nome' },
  ]

  protected acoesTabela: Array<PoTableAction> = [
    { label: 'Editar', icon: this.iconeEditar, action: this.editar_Click.bind(this) },
    { label: 'Excluir', icon: 'ph-fill ph-minus-circle', action: this.excluir_Click.bind(this) }
  ]

  protected inserirSubCategoria_Click(): void {
    this._dialog.showInput({
      title: 'Criação de Subcategoria',
      label: 'Informe o nome da nova Subcategoria',
      onConfirm: (valor: string) => {
        this.confirmouInsercaoNomeSubCategoria(valor);
      }
    })
  }

  private confirmouInsercaoNomeSubCategoria(nome: string): void {
    this._service.inserirSubCategoria(this.categoria.Id, nome).subscribe({
      next: data => {
        this.categoria.SubCategorias = [...this.categoria.SubCategorias, data];
      },
      error: err => {
        this.tratarErro(err);
      },
      complete: () => {
      }
    });
  }

  private editar_Click(subCategoria: ISubCategoria): void {
    this._dialog.showInput({
      valor: subCategoria.Nome,
      title: 'Editar subcategoria',
      label: 'Informe o nome da subcategoria',
      onConfirm: (valor: string) => {
        subCategoria.Nome = valor;
        this._service.editarSubCategoria({ IdCategoria: subCategoria.IdCategoria, Id: subCategoria.Id, Nome: valor }).subscribe({
          next: data => {
            if (data > 0)
              subCategoria.Nome = valor;
          },
          error: err => {
            this.tratarErro(err);
          },
          complete: () => {
          }
        });
      }
    });
  }

  private excluir_Click(subCategoria: ISubCategoria): void {
    this._dialog.confirm({
      title: 'Exclusão de SubCategoria',
      message: `Atenção!<br>Deseja realmente EXCLUIR a subcategoria <b>${subCategoria.Nome}</b>?`,
      confirm: () => {
        this.processarExclusaoSubCategoria(subCategoria);
      }
    });
  }

  private processarExclusaoSubCategoria(subCategoria: ISubCategoria): void {
    this._service.excluirSubCategoria(this.categoria.Id, subCategoria.Id).subscribe({
      next: data => {
        if (data > 0)
          this.categoria.SubCategorias = this.categoria.SubCategorias.filter(sub => sub.Id !== subCategoria.Id);
      },
      error: err => {
        this.tratarErro(err);
      },
      complete: () => {
      }
    });
  }
}

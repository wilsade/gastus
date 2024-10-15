import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GastusBaseComponent } from './gastus-base-component';
import { PoModule, PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { CategoriaService } from '../categoria/categoria.service';
import { ComboCategoria } from '../_models/ICategoria';

@Component({
  selector: 'app-categoria-controls',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './categoria-controls.component.html'
})
export class CategoriaControlsComponent extends GastusBaseComponent implements OnInit {

  constructor(protected override _notification: PoNotificationService,
    private readonly _service: CategoriaService) {
    super(_notification);
  }

  categorias: ComboCategoria[] = [];
  subCategorias: PoSelectOption[] = [];

  @Input()
  IdCategoria: number = 0;

  @Output()
  IdCategoriaChange = new EventEmitter<number>();

  @Input()
  IdSubCategoria: number = 0;

  @Output()
  IdSubCategoriaChange = new EventEmitter<number>();

  ngOnInit(): void {
    this.carregarCategorias();
  }

  protected carregarCategorias(): void {
    this._service.getComboCategorias().subscribe({
      next: (categorias: ComboCategoria[]) => {
        this.categorias = categorias;
      },
      error: (err: any) => {
        this.tratarErro(err);
      }
    });
  }

  protected alterouCategoria(idCategoria: number): void {
    this.IdCategoria = idCategoria;

    this.loadSubCategorias(idCategoria);
    this.IdCategoriaChange.emit(this.IdCategoria);
  }

  protected alterouSubCategoria(idSubCategoria: number): void {
    this.IdSubCategoria = idSubCategoria;
    this.IdSubCategoriaChange.emit(this.IdSubCategoria);
  }

  loadSubCategorias(idCategoria: number, idSubCategoria: number | undefined = undefined): void {
    const categoriaSelecionada = this.categorias.find(c => c.value == idCategoria);
    this.subCategorias = [];
    if (categoriaSelecionada) {
      this.subCategorias = categoriaSelecionada.Filhas;
      this.IdSubCategoria = 0;
    }
    if (idSubCategoria)
      this.IdSubCategoria = idSubCategoria;
  }
}

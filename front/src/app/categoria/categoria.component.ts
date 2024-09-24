import { Component, OnInit } from '@angular/core';
import { PoModule, PoTableColumn } from '@po-ui/ng-components';
import { CategoriaService } from './categoria.service';
import { ICategoria } from '../_models/ICategoria';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [PoModule],
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  categorias: Array<ICategoria>;

  constructor(private _service: CategoriaService) { }

  protected readonly colunas: PoTableColumn[] = [
    { label: 'Id.', property: 'Id', width: '10%' },
    { label: 'Nome', property: 'Nome' }
  ]

  ngOnInit() {
    this._service.getCategorias().subscribe({
      next: data => {
        console.log(data);
        this.categorias = data;
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
        console.log('categorias ok');
      }
    });
  }

}

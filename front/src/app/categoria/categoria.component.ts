import { Component, OnInit } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { AppService } from '../app.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [PoModule],
  templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

  categorias: Array<any>;

  constructor(private _service: AppService) { }

  ngOnInit() {
    console.log('meu ambiente: ', environment.nome);
    this._service.getCategorias().subscribe({
      next: data => {
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

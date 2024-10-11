import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILancamento } from '../_models/ILancamento';
import { map, Observable } from 'rxjs';
import { CategoriaService } from '../categoria/categoria.service';
import { ComboCategoria, ICategoria } from '../_models/ICategoria';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  lancamentosUrl = `${environment.apiUrl}/lancamentos`;

  constructor(private readonly _http: HttpClient,
    private readonly _serviceCategoria: CategoriaService) { }

  getEmptyLancamento(): ILancamento {
    return {
      Id: 0, Data: new Date(), Titulo: '', Comentario: '', IdCategoria: 0, IdSubCategoria: 0,
      IdTipoTransacao: null, Valor: 0, SALDO: 0
    }
  }

  getLancamentos(): Observable<ILancamento[]> {
    return this._http.get<ILancamento[]>(this.lancamentosUrl).pipe(
      map((response: ILancamento[]) => {
        this.formatarValores(response);
        return response;
      }));
  }

  getComboCategorias(): Observable<ComboCategoria[]> {
    return this._serviceCategoria.getCategorias(true).pipe(
      map((categorias: ICategoria[]) => {
        return categorias.map(categoria => new ComboCategoria(categoria));
      })
    );
  }

  private formatarValores(lancamentos: ILancamento[]): void {
    let saldo = 0;
    lancamentos.forEach(lancamento => {

      lancamento.Data = new Date(lancamento.Data);

      saldo += lancamento.Valor;
      lancamento.SALDO = saldo;
    });
  }
}

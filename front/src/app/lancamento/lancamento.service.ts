import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILancamento } from '../_models/ILancamento';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  lancamentosUrl = `${environment.apiUrl}/lancamentos`;

  constructor(private readonly _http: HttpClient) { }

  getEmptyLancamento(): ILancamento {
    return {
      Id: 0, Data: new Date(), Titulo: '', Comentario: '', IdCategoria: 0, IdSubCategoria: 0,
      IdTipoTransacao: null, Valor: 0, SALDO: 0
    }
  }

  getLancamentos(): Observable<ILancamento[]> {
    return this._http.get<ILancamento[]>(this.lancamentosUrl).pipe(
      map((response: ILancamento[]) => {
        this.calculaSaldo(response);
        return response;
      }));
  }

  private calculaSaldo(lancamentos: ILancamento[]): void {
    let saldo = 0;
    lancamentos.forEach(lancamento => {
      saldo += lancamento.Valor;
      lancamento.SALDO = saldo;
    });
  }
}

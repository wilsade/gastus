import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILancamento } from '../_models/ILancamento';
import { map, Observable } from 'rxjs';
import { CategoriaService } from '../categoria/categoria.service';

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

  /**
   * Editar um lançamento
   * @param lancamento Lançamento a ser editado
   * @returns Total de linha alteradas
   */
  editarLancamento(lancamento: ILancamento): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put<number>(this.lancamentosUrl, lancamento, { headers });
  }

  excluirLancamento(id: number): Observable<number> {
    return this._http.delete<number>(`${this.lancamentosUrl}/${id}`);
  }

  inserirLancamento(item: ILancamento): Observable<ILancamento> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post<ILancamento>(this.lancamentosUrl, item, { headers });
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

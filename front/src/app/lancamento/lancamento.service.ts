import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILancamento, ILancamentoView, ILookupLancamento } from '../_models/ILancamento';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  lancamentosUrl = `${environment.apiUrl}/lancamentos`;

  static readonly COLUNA_Id = 'Id';
  static readonly COLUNA_COMENTARIO = 'Comentario';
  static readonly COLUNA_IdTipoTransacao = 'IdTipoTransacao';

  constructor(private readonly _http: HttpClient) { }

  getEmptyLancamento(): ILancamento {
    return {
      Id: 0, Data: new Date(), Titulo: '', Comentario: '', IdCategoria: 0, IdSubCategoria: 0,
      IdTipoTransacao: null, Valor: 0, SALDO: 0
    }
  }

  getLancamentos(): Observable<ILancamentoView[]> {
    return this._http.get<ILancamentoView[]>(this.lancamentosUrl).pipe(
      map((response: ILancamentoView[]) => {
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

  getLookupByTitulo(): Observable<ILookupLancamento[]> {
    return this._http.get<ILookupLancamento[]>(`${this.lancamentosUrl}/bytitulo`);
  }

  private formatarValores(lancamentos: ILancamentoView[]): void {
    let saldo = 0;
    lancamentos.forEach(lancamento => {

      lancamento.Data = new Date(lancamento.Data);

      saldo += lancamento.Valor;
      lancamento.SALDO = saldo;
    });
  }

  importarLancamentos(dados: ILancamento[]): Observable<ILancamento[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post<ILancamento[]>(`${this.lancamentosUrl}/import`, dados, { headers });
  }
}

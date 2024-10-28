import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOrcamento, IOrcamentoInsertModel, IOrcamentoView } from '../_models/IOrcamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  orcamentosUrl = `${environment.apiUrl}/orcamento`;

  constructor(private readonly _http: HttpClient) { }

  createEmptyInsertModel(): IOrcamentoInsertModel {
    return {
      IdCategoria: 0, IdSubCategoria: 0, NumMeses: [],
      Valor: 0, Descricao: ''
    }
  }

  getEmptyOrcamento(): IOrcamento {
    return {
      Id: 0, IdCategoria: 0, IdSubCategoria: 0, NumMes: -1,
      Valor: 0, Descricao: ''
    }
  }

  getOrcamentos(): Observable<IOrcamentoView[]> {
    return this._http.get<IOrcamentoView[]>(this.orcamentosUrl);
  }

  inserirOrcamento(item: IOrcamentoInsertModel): Observable<IOrcamento[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.post<IOrcamento[]>(this.orcamentosUrl, item, { headers });
  }

  excluirOrcamento(id: number): Observable<number> {
    return this._http.delete<number>(`${this.orcamentosUrl}/${id}`);
  }

  editarOrcamento(orcamento: IOrcamento): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.put<number>(this.orcamentosUrl, orcamento, { headers });
  }
}

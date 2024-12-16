import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILancamentosPorCategoriaMes, IRelatPrevistoRealizado } from '../_models/IRelatorios';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  relatoriosUrl = `${environment.apiUrl}/relatorios`;

  constructor(private readonly _http: HttpClient) { }

  getTotaisAplicacoes(): Observable<any> {
    return this._http.get<any>(`${this.relatoriosUrl}/totalaplicacoes`);
  }

  getLancamentosPorCategoriaMes(): Observable<ILancamentosPorCategoriaMes[]> {
    return this._http.get<ILancamentosPorCategoriaMes[]>(`${this.relatoriosUrl}/lancamentosPorCategoriaMes`);
  }

  getPrevistoRealizado(): Observable<Array<IRelatPrevistoRealizado>> {
    return this._http.get<Array<IRelatPrevistoRealizado>>(`${this.relatoriosUrl}/previstorealizado`);
  }
}

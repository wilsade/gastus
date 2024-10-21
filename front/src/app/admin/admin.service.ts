import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly admimSQLUrl = `${environment.apiUrl}/admin/sql`;

  constructor(private readonly _http: HttpClient) { }

  query(sqlSelect: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = JSON.stringify(sqlSelect);
    return this._http.post<any>(`${this.admimSQLUrl}/select`, body, { headers });
  }

  execute(sqlSelect: string): Observable<number> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = JSON.stringify(sqlSelect);
    return this._http.post<number>(`${this.admimSQLUrl}/execute`, body, { headers });
  }

}

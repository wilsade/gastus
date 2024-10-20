import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private admimSQLUrl = `${environment.apiUrl}/admin/sql`;

  constructor(private readonly _http: HttpClient) { }

  query(sqlSelect: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    var body = JSON.stringify(sqlSelect);
    return this._http.post<any>(`${this.admimSQLUrl}/select`, body, { headers });
  }
}

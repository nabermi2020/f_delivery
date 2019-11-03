import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeaders(headers: HttpHeaders): void {
    headers.append('Authorization', 'Basic' + btoa('login:password'));
  }

  public get(url: string): Observable<any> {
    let headers = new HttpHeaders({'Content-type': 'application/json'});
    this.createAuthorizationHeaders(headers);
    return this.http.get(url, { headers: headers});
  }

  public post(url: string, data): Observable<any> {
    let headers = new HttpHeaders({'Content-type': 'application/json'});
    this.createAuthorizationHeaders(headers);
    return this.http.post(url, data, { headers:headers });
  }
}

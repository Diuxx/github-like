import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractService } from './abstract.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService extends AbstractService {

  constructor(http: HttpClient) {
    super(http, 'files');
  }

  /**
   * get element with id
   * @param Id 
   */
  public get(Id: string | number): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8'
    });
    return this.http.get(`${environment.api}/${this.uri}/${Id}`, { headers: headers, responseType: 'text' });
  }

}

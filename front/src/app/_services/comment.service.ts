import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends AbstractService {

  constructor(http: HttpClient) {
    super(http, 'comments');
  }

  /**
   * getAll api function
   */
  public get<T>(id?: string, headers?: HttpHeaders): Observable<T[]> {
    let url: string = `${environment.api}/${this.uri}` + ((id != undefined) ? `/${id}`:``);
    return this.http.get<T[]>(url, { headers: headers });
  }
}
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class UserService {
  private urlResource = environment.endPoint + '/users/caspyin';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<HttpResponse<any>> {
    return this.http.get(`${this.urlResource}`, {observe: 'response'});
  }

  createUser(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteUSer(id): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyUser(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}

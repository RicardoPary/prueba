import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserFilter} from '../models/user';
import {createRequestOption} from '../models/extras/request-util';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
  private urlResource = environment.endPoint + '/users';
  private userFilter = new BehaviorSubject<any>(new UserFilter());
  private user = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
  }

  sendUserFilter(object: any) {
    this.userFilter.next(object);
  }

  currentUserFilter(): Observable<any> {
    return this.userFilter.asObservable();
  }

  getUserFilter() {
    return this.userFilter.getValue();
  }

  sendUser(object: any) {
    this.user.next(object);
  }

  getUser(user: any): Observable<HttpResponse<any>> {
    if (this.user.getValue()) {
      return new Observable(observer => observer.next(this.user.getValue()));
    }
    return this.http.get(`${this.urlResource}/${user}`, {observe: 'response'}).pipe(
      map(res => {
        if (res) {
          this.user.next(res);
          return this.user.getValue();
        }
      })
    );
  }

  getAllUsers(userFilter: UserFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': userFilter.page,
      'per_page': userFilter.size
    });
    return this.http.get(`${this.urlResource}`, {params: params, observe: 'response'});
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

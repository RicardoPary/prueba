import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {createRequestOption} from '../models/extras/request-util';
import {RepositoryFilter} from '../models/repository';

@Injectable()
export class RepositoryService {
  private urlResource = environment.endPoint + '/users';
  private repositoryFilter = new BehaviorSubject<any>(new RepositoryFilter());

  constructor(private http: HttpClient) {
  }

  sendRepositoryFilter(object: any) {
    this.repositoryFilter.next(object);
  }

  currentRepositoryFilter(): Observable<any> {
    return this.repositoryFilter.asObservable();
  }

  getRepositoryFilter() {
    return this.repositoryFilter.getValue();
  }

  getAllRepositories(repositoryFilter: RepositoryFilter): Observable<HttpResponse<any>> {
    const params = createRequestOption({
      'page': repositoryFilter.page,
      'per_page': repositoryFilter.size
    });
    return this.http.get(`${this.urlResource}/${repositoryFilter.repository.username}/repos`, {params: params, observe: 'response'});
  }

  getAllIssues(owner: any, repo: any): Observable<HttpResponse<any>> {
    return this.http.get(`${environment.endPoint}/repos/${owner}/${repo}/issues`, {observe: 'response'});
  }

  createRepository(body: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.urlResource}`, body, {observe: 'response'});
  }

  deleteRepository(id): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.urlResource}/${id}`, {observe: 'response'});
  }

  modifyRepository(body: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.urlResource}`, body, {observe: 'response'});
  }
}

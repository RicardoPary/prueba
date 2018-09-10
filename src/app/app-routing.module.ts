import {Injectable, NgModule} from '@angular/core';
import {Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class RepositoriesResolvePagingParams implements Resolve<any> {

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    console.log(route.queryParams['page']);

    const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
    return {
      page: page
    };
  }
}

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', loadChildren: './pages/users/users.module#UsersModule'},
  {
    path: 'users/repositories/:username',
    loadChildren: './pages/repositories/repositories.module#RepositoriesModule',
    resolve: {'pagingParams': RepositoriesResolvePagingParams}
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RepositoriesComponent} from './repositories.component';

const routes: Routes = [
  {path: '', component: RepositoriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoriesRoutingModule {
}

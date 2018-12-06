import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { ParamsComponent } from './params/params.component';
import { ResultadoComponent } from './resultado/resultado.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent,
  },
  {
    path: 'params',
    component: ParamsComponent,
  },
  {
    path: 'resultado',
    component: ResultadoComponent,
  },
  { path: '**', redirectTo: 'menu' },
  { path:'', redirectTo: 'menu', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
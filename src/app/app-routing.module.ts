import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent }from './admin/admin.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InicioComponent } from './inicio/inicio.component';
import { PatovaGuard } from './patova.guard';
import { ProductoComponent } from './producto/producto.component';

const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'producto', component:ProductoComponent},
  {path:'admin', component:AdminComponent, canActivate:[PatovaGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

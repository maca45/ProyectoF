/* Importacion de modulos */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InicioComponent } from './inicio/inicio.component';

import { ProductoComponent } from './producto/producto.component';

//Importacion de los productos

/* Define las rutas de la aplicación. */
const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'producto', component:ProductoComponent},
  {path: 'login', component:LoginComponent},
  

 
];

/* Importar el RouterModule y las rutas. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
/* La clase AppRoutingModule es una clase TypeScript decorada con el decorador @NgModule
función*/
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent }from './admin/admin.component';
import { ContactoComponent } from './contacto/contacto.component';
import { InicioComponent } from './inicio/inicio.component';
import { PatovaGuard } from './patova.guard';
import { ProductoComponent } from './producto/producto.component';

//Importacion de los productos
import { AceitesComponent } from './productos/aceites/aceites.component';
import { FrutosSecosComponent } from './productos/frutos-secos/frutos-secos.component';
import { HarinasComponent } from './productos/harinas/harinas.component';
import { LecheComponent } from './productos/leche/leche.component';
import { MantecasComponent } from './productos/mantecas/mantecas.component';
import { SalsasComponent } from './productos/salsas/salsas.component';
import { ShampooComponent } from './productos/shampoo/shampoo.component';
import { YerbaComponent } from './productos/yerba/yerba.component';

const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'producto', component:ProductoComponent},
  {path:'admin', component:AdminComponent, canActivate:[PatovaGuard]},

  //Productos
  {path:'aceites', component:AceitesComponent},
  {path:'frutos-secos', component:FrutosSecosComponent},
  {path:'harinas', component:HarinasComponent},
  {path:'leche', component:LecheComponent},
  {path:'mantecas', component:MantecasComponent},
  {path:'salsas', component:SalsasComponent},
  {path:'shampoo', component:ShampooComponent},
  {path:'yerba', component:YerbaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

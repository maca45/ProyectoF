import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ProductoComponent } from './producto/producto.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';

import {MenubarModule} from 'primeng/menubar';
import { AceitesComponent } from './productos/aceites/aceites.component';
import { MantecaComponent } from './productos/manteca/manteca.component';
import { ShampooComponent } from './productos/shampoo/shampoo.component';
import { SalsasComponent } from './productos/salsas/salsas.component';
import { FrutosSecosComponent } from './productos/frutos-secos/frutos-secos.component';
import { LecheComponent } from './productos/leche/leche.component';
import { HarinasComponent } from './productos/harinas/harinas.component';
import { YerbaComponent } from './productos/yerba/yerba.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminComponent,
    ContactoComponent,
    ProductoComponent,
    FooterComponent,
    InicioComponent,
    AceitesComponent,
    MantecaComponent,
    ShampooComponent,
    SalsasComponent,
    FrutosSecosComponent,
    LecheComponent,
    HarinasComponent,
    YerbaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

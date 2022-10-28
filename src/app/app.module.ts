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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminComponent,
    ContactoComponent,
    ProductoComponent,
    FooterComponent,
    InicioComponent
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

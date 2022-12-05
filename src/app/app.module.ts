//aca se importan  todas las rutas y componentes a utilizar 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';

import { ContactoComponent } from './contacto/contacto.component';
import { ProductoComponent } from './producto/producto.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import {AngularFireModule} from '@angular/fire/compat';

import {CardModule} from 'primeng/card';

//importaciones para el p-dialog
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

import {MenubarModule} from 'primeng/menubar';
import {ImageModule} from 'primeng/image';
import { environment } from 'src/environments/environment';
import { PatovaGuard } from './patova.guard';

//Importacion de los servicios para el Crud y el Storage
import { StorageService } from './servicios/storage.service';
import { ProductosService } from './servicios/productos.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContactoComponent,
    ProductoComponent,
    FooterComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    ImageModule,
    DialogModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],

  providers: [UsuariosService, PatovaGuard, StorageService, ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

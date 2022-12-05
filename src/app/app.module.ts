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
import { AdminComponent } from './admin/admin.component';

//importaciones para el p-dialog
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';

import {MenubarModule} from 'primeng/menubar';
import {ImageModule} from 'primeng/image';
import { UsuariosService } from './servicios/usuarios.service';
import { environment } from 'src/environments/environment';
import { PatovaGuard } from './patova.guard';



@NgModule({
  /* Declarar todos los componentes que se utilizan en la aplicación. */
  declarations: [
    AppComponent,
    MenuComponent,
    AdminComponent,
    ContactoComponent,
    ProductoComponent,
    FooterComponent,
    InicioComponent,
  
  ],
  imports: /* Importar todos los módulos necesarios para que la aplicación funcione. */
  [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    ImageModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    ImageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)

  
  ],
  providers: [UsuariosService, PatovaGuard,],
  bootstrap: [AppComponent]
})
export class AppModule { }

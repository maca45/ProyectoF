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
import { AceitesComponent } from './productos/aceites/aceites.component';
import { FrutosSecosComponent } from './productos/frutos-secos/frutos-secos.component';
import { MantecasComponent } from './productos/mantecas/mantecas.component';
import { HarinasComponent } from './productos/harinas/harinas.component';
import { YerbaComponent } from './productos/yerba/yerba.component';
import { ShampooComponent } from './productos/shampoo/shampoo.component';
import { LecheComponent } from './productos/leche/leche.component';
import { StorageService } from './servicios/storage.service';
import { CardComponent } from './card/card.component';

//Importacion de componentes utilizados 
import {CardModule} from 'primeng/card';



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
    FrutosSecosComponent,
    MantecasComponent,
    HarinasComponent,
    YerbaComponent,
    ShampooComponent,
    LecheComponent,
    CardComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    ImageModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    CardModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig)

  
  ],
  providers: [UsuariosService, PatovaGuard, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
//Importacion de componentes utilizados 
import {CardModule} from 'primeng/card';
import { AceitesService } from './servicios/aceites.service';
import { FrutosSecosService } from './servicios/frutos-secos.service';
import { HarinasService } from './servicios/harinas.service';
import { LecheService } from './servicios/leche.service';
import { MantecasService } from './servicios/mantecas.service';
import { ShampooService } from './servicios/shampoo.service';
import { YerbaService } from './servicios/yerba.service';



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
    LecheComponent
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
  providers: [UsuariosService, PatovaGuard, StorageService, AceitesService, FrutosSecosService, HarinasService, LecheService, MantecasService, ShampooService, YerbaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

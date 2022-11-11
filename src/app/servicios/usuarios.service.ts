import { Injectable } from '@angular/core';
import { Usuarios } from '../model/usuarios';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private isLoged = false

    //declaramos usuariosCollection a privado

    private usuariosCollection: AngularFirestoreCollection<Usuarios>

    //lo conectamos con la base de datos

    constructor(private db:AngularFirestore) { 
      this.usuariosCollection = db.collection('Usuarios');
    }

    //obtenemos los usuarios de base de datos

    obtenerUsuarios(){
      return this.usuariosCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    }
  
    estaLogueado(){
      return this.isLoged
    }
}

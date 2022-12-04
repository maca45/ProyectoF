/* El código anterior está importando los módulos necesarios para que el servicio funcione. */
import { Injectable } from '@angular/core';
import { Usuarios } from '../model/usuarios';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map } from 'rxjs';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private isLoged = false

  
 /*Declara la variable privada llamada usuariosCollection de tipo AngularFirestoreCollection<Usuarios>*/
    private usuariosCollection: AngularFirestoreCollection<Usuarios>


    //lo conectamos con la base de datos
  /**
   * La función constructora es una función especial que se llama cuando se crea una nueva instancia de la clase
   * creada
   * @param {AngularFirestore} db - AngularFirestore - Esta es la clase principal para interactuar con la
   * base de datos Firestore.
   */
    constructor(private db:AngularFirestore, public router: Router) { 
      this.usuariosCollection = db.collection('Usuarios');
    }

    //obtenemos los usuarios de base de datos
   /**
   * La función obtenerUsuarios() devuelve una colección de documentos de la colección
    * usuariosCollection
    * @returns El método devuelve un observable de la colección de usuarios.
    */
    obtenerUsuarios(){
      return this.usuariosCollection.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
    }

    

/**
 * Cambia el valor de la variable isLoged a true.
 */
    iniciarSesion(){
      this.isLoged = true
    }

    /**
     * Devuelve el valor de la variable isLoged.
     * @returns Se devuelve la función isLoged().
     */
    estaLogueado(){
      return this.isLoged
    }
}

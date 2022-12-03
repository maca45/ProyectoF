import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Producto } from '../model/producto';


/*import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { async, map } from '@firebase/util';
import { Action } from 'rxjs/internal/scheduler/Action'; */

@Injectable({
  providedIn: 'root'
})
export class AceitesService {
  private coleccionAceites: AngularFirestoreCollection<Producto>;

  constructor(private db: AngularFirestore) {
    this.coleccionAceites = db.collection('aceites');
  }


  //Obtenemos todos los datos guardados en la base de dato
  getProductos(){
    return this.coleccionAceites.snapshotChanges().
    pipe(map(action=>action.map(a=>a.payload.doc.data())))  
  } 


  //Creo un producto
  createProducto(nuevoProducto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.db.createId();
        nuevoProducto.idProducto = id;
        nuevoProducto.img = url
        const respuesta = await this.coleccionAceites.doc(id).set(nuevoProducto);
        resolve(respuesta) 
      } 
      catch (error) { 
        reject(error)
      } 
    })
  }

  //Edito el producto
  editarProducto(idProducto: string, nuevosDatos: Producto) {
    return this.coleccionAceites.doc(idProducto).update(nuevosDatos)
  }

  //Elimino el producto
  deleteProducto(idProducto: string) {
    return new Promise((resolve, reject) => {
      try {
        const respuesta = this.coleccionAceites.doc(idProducto).delete()
        resolve(respuesta)
      }
      catch (error) {
        reject(error)
      }
    })
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class MantecasService {

  private coleccionManteca: AngularFirestoreCollection<Producto>;

  constructor(private db: AngularFirestore) {
    this.coleccionManteca = db.collection('manteca');
  }


  //Obtenemos todos los datos guardados en la base de dato
  getProductos() {
    return this.coleccionManteca.snapshotChanges().
      pipe(map(action => action.map(a => a.payload.doc.data())))
  }


  //Creo un producto
  createProducto(nuevoProducto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.db.createId();
        nuevoProducto.idProducto = id;
        nuevoProducto.img = url
        const respuesta = await this.coleccionManteca.doc(id).set(nuevoProducto);
        resolve(respuesta)
      }
      catch (error) {
        reject(error)
      }
    })
  }

  //Edito el producto
  editarProducto(idProducto: string, nuevosDatos: Producto) {
    return this.coleccionManteca.doc(idProducto).update(nuevosDatos)
  }

  //Elimino el producto
  deleteProducto(idProducto: string) {
    return new Promise((resolve, reject) => {
      try {
        const respuesta = this.coleccionManteca.doc(idProducto).delete()
        resolve(respuesta)
      }
      catch (error) {
        reject(error)
      }
    })
  }

}

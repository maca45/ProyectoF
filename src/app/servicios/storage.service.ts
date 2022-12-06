import { Injectable } from '@angular/core';
import {getStorage, uploadString, UploadResult, ref, getDownloadURL, deleteObject } from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private respuesta!: UploadResult;

  private storage = getStorage()

  constructor() { }

  //Carga la imagen en el Storage y la retorna 
  async subirImagen(nombre: string, imagen: any) {
    try {
      let referenciaImagen = ref(this.storage, 'productos/' + nombre)
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')
        .then(resp => {
          return resp
        })
      return this.respuesta
    }
    catch (error) {
      console.log(error)
      return this.respuesta
    }
  }

  //Obtenemos la URL desde el Storage
  obtenerUrlImagen(respuesta: UploadResult) {
    return getDownloadURL(respuesta.ref)
  }

  //Se eliminara la imagen
  eliminarImagen(urlmagen: string) {
    let referenciaImagen = ref(this.storage, urlmagen);
    deleteObject(referenciaImagen)
      .then(resp => {
        alert("La imagen fue eliminada con éxito");
      })
      .catch(err => {
        alert("No se pudo eliminar la imagen. Error: " + err)
      })

  }
  
} 

import { Injectable } from '@angular/core';
import { getStorage, uploadString, UploadResult, ref, getDownloadURL, deleteObject } from 'firebase/storage'

@Injectable({
  providedIn: 'root'
}) 
export class StorageService {
  
 constructor() { }

 
 private respuesta!: UploadResult;
 storage_productos = getStorage();
 urlImagen: string = "";


 //Carga la imagen al Storage y la retorna 
 async subirImagen(nombre: string, imagen: any) {
   try {
     let referenciaImagen = ref(this.storage_productos, 'productos/' + nombre)
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

 // Se obtendra la URL de la imagen
 obtenerUrlImagen(respuesta:UploadResult){
   return getDownloadURL (respuesta.ref)
 }


 // Se eliminara la imagen 
 eliminarImagen(urlImagen:string){
   let referenciaImagen = ref(this.storage_productos,urlImagen);
   deleteObject(referenciaImagen)
   .then(resp=>{
     alert("Imagen eliminada con exito");
   })
   .catch(err=>{
     alert("La imagen no pudo eliminarse. Error:"+err)
   })
 }
}
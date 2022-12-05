import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Producto } from 'src/app/model/producto';
import { HarinasService } from 'src/app/servicios/harinas.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({ 
  selector: 'app-harinas',
  templateUrl: './harinas.component.html',
  styleUrls: ['./harinas.component.css']
})
export class HarinasComponent implements OnInit {

  imagen!: string;

  harinas: Producto[] = [];

  nombreImagen!: string; 



  nuevoProducto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
  }) 

  modalVisible: boolean = false;

  productoSeleccionado!: Producto; 

  coleccionHarinas!: import("@angular/fire/compat/firestore").AngularFirestoreCollection<HarinasService>;
  
  textoBoton!: string;
  eliminarVisible: boolean = false;

  constructor(private servicioStorage: StorageService, private servicioProductos: HarinasService) {}
    /*this.coleccionHarinas= db.collection('harinas');*/

  ngOnInit(): void {
    this.servicioProductos.getProductos().subscribe((producto: any) => {
      this.harinas = producto
    })

  }

  async agregarProducto(){
    if(this.nuevoProducto.valid){
      let nuevoProducto:Producto = {
        nombre: this.nuevoProducto.value.nombre!,
        precio: this.nuevoProducto.value.precio!,
        descripcion: this.nuevoProducto.value.descripcion!,
        img: "",
        idProducto: "",
        }
      
        this.servicioStorage.subirImagen(this.nombreImagen,this.imagen)
        .then(
          async (resp: any)=>{
            this.servicioStorage.obtenerUrlImagen(resp).
            then(
              async (url: any)=>{
                await this.servicioProductos.createProducto(nuevoProducto,url)
                .then(()=>{
                  alert("Producto agregado con exito")
                })
                .catch((error: string)=>{
                  alert("Ocurrió un error\nError: "+error)
                })
              }
            )
          }
        )

    }
    else{
    alert("Hay campos vacíos")
    }
}

  actualizarProducto() {
    let nuevoProducto: Producto = {
      nombre: this.nuevoProducto.value.nombre!,
      precio: this.nuevoProducto.value.precio!,
      descripcion: this.nuevoProducto.value.descripcion!,
      img: "",
      idProducto: this.productoSeleccionado.idProducto,
    }
    this.servicioProductos.editarProducto(this.productoSeleccionado?.idProducto, nuevoProducto)
      .then(() => {
        alert("Se actualizo con exito")
      })
      .catch((Error: string) => {
        alert("No se pudo actualizar el producto\nError:" + Error)
      })
  }

  mostrarEliminar(aceites: Producto) {
    this.eliminarVisible = true
    this.productoSeleccionado = aceites
  }

  eliminarProducto() {
    this.servicioProductos.deleteProducto(this.productoSeleccionado.idProducto)
      .then(() => {
        this.servicioStorage.eliminarImagen(this.productoSeleccionado.img)
        alert("El producto fue eliminado con éxito")
      })
      .catch((err: string) => {
        alert("No se pudo eliminar el producto\nError: " + err)
      })
    this.eliminarVisible = false
  }

  mostrarEditar(productoSeleccionado: Producto) {
    this.productoSeleccionado = productoSeleccionado
    this.imagen = this.productoSeleccionado.img
    this.nuevoProducto.setValue({
      nombre: productoSeleccionado.nombre,
      descripcion: productoSeleccionado.descripcion,
      precio: productoSeleccionado.precio,
    })
    this.textoBoton = "Editar Producto"
    this.modalVisible = true
  }

  cargarProducto() {
    if (this.textoBoton === "Agregar Producto") {
      this.agregarProducto()
    }
    else if (this.textoBoton === "Editar Producto") {
      this.actualizarProducto()
    }
    this.nuevoProducto.reset()
    this.modalVisible = false
  }

  cargarImagen(event: any) {
    let archivo = event.target.files[0];
    let reader = new FileReader();
    if (archivo != undefined) {
      reader.readAsDataURL(archivo)
      reader.onloadend = () => {
        let url = reader.result
        if (url != null) {
          this.nombreImagen = archivo.name
          this.imagen = url.toString()
        }
      }
    }
  }

}

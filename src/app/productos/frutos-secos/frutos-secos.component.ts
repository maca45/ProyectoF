import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/model/producto';
import { FrutosSecosService } from 'src/app/servicios/frutos-secos.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-frutos-secos',
  templateUrl: './frutos-secos.component.html',
  styleUrls: ['./frutos-secos.component.css']
})
export class FrutosSecosComponent implements OnInit {

  imagen!: string;

  frutos_secos: Producto[] = [];

  nombreImagen!: string;

  nuevoProducto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
  })

  modalVisible: boolean = false;

  productoSeleccionado!: Producto;

  coleccionFrutosSecos!: import("@angular/fire/compat/firestore").AngularFirestoreCollection<FrutosSecosService>;
 
  textoBoton!: string;

  eliminarVisible: boolean = false;

  constructor(private servicioStorage: StorageService, private servicioProductos: FrutosSecosService) {}

  ngOnInit(): void {
    this.servicioProductos.getProductos().subscribe((producto: any) => {
      this.frutos_secos = producto
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
      .then((resp: any) => {
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
      .then((resp: any) => {
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

/*Agrega y edita el producto */
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

/**
 * Toma el archivo de la entrada, lo lee como una URL de datos y luego establece el nombre de la imagen y la URL 
   de la imagen al nombre del archivo y URL de datos
 * @param {any} event - any: Este es el evento que se activa cuando el usuario selecciona un archivo.
 */
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

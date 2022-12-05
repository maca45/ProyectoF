import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { async } from '@firebase/util';
import { Producto } from 'src/app/model/producto';
import { AceitesService } from 'src/app/servicios/aceites.service';
import { StorageService } from 'src/app/servicios/storage.service'; 

@Component({
  selector: 'app-aceites',
  templateUrl: './aceites.component.html',
  styleUrls: ['./aceites.component.css']
}) 
export class AceitesComponent implements OnInit {

  imagen!: string; 

  aceites: Producto[] = [];

  nombreImagen!: string;

  nuevoProducto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
  })

  modalVisible: boolean = false;

  productoSeleccionado!: Producto;

  coleccionAceites!: import("@angular/fire/compat/firestore").AngularFirestoreCollection<AceitesService>;

  textoBoton!: string; 

  eliminarVisible: boolean = false;

  constructor(private servicioStorage: StorageService, private servicioProductos: AceitesService) {}

  ngOnInit(): void {
    this.servicioProductos.getProductos().subscribe((producto: any) => {
      this.aceites = producto
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



/* */
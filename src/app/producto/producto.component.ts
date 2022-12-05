import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Producto } from '../model/producto';
import { ProductosService } from '../servicios/productos.service';
import { StorageService } from '../servicios/storage.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  imagen!: string;

  productos: Producto[] = [];

  nombreImagen!: string;

  nuevoProducto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    descripcion: new FormControl('', Validators.required),
  })

  modalVisible: boolean = false;

  productoSeleccionado!: Producto;

  coleccionProductos!: import("@angular/fire/compat/firestore").AngularFirestoreCollection<ProductosService>;

  textoBoton!: string;

  eliminarVisible: boolean = false;

  public logueado: boolean = false;

  constructor(private servicioStorage: StorageService, private servicioProductos: ProductosService, private auth: AuthService) { }

  ngOnInit(): void {

    // Traigo los productos de la base de datos
    this.servicioProductos.getProductos().subscribe((producto: any) => {
      this.productos = producto
    })

    // Verifico el estado del usuario.
    this.auth.user.subscribe((user) => {
      if (user) {
        this.logueado = true;
      }
      else {
        this.logueado = false;
      }
    })

  }

  async agregarProducto() {
    if (this.nuevoProducto.valid) {
      let nuevoProducto: Producto = {
        nombre: this.nuevoProducto.value.nombre!,
        precio: this.nuevoProducto.value.precio!,
        descripcion: this.nuevoProducto.value.descripcion!,
        img: "",
        idProducto: "",
      }

      this.servicioStorage.subirImagen(this.nombreImagen, this.imagen)
        .then(
          async (resp: any) => {
            this.servicioStorage.obtenerUrlImagen(resp).
              then(
                async (url: any) => {
                  await this.servicioProductos.createProducto(nuevoProducto, url)
                    .then(() => {
                      alert("Producto agregado con exito")
                    })
                    .catch((error: string) => {
                      alert("Ocurrió un error\nError: " + error)
                    })
                }
              )
          }
        )

    }
    else {
      alert("Hay campos vacíos")
    }
  }

  //Declaro el boton "Agregar Producto"
  mostrarDialogo() {
    this.imagen = ""
    this.textoBoton = "Agregar Producto"
    this.modalVisible = true;
  }

  /**
   * It takes the data from the form and creates a new object with the data from the form and the id of
   * the product to be updated. Then it calls the editProduct function from the service and if it's
   * successful it shows an alert, if not it shows an alert with the error
   */
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
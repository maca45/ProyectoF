import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Producto } from '../model/producto';
import { ProductoService } from '../servicios/producto.service';
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

  coleccionProductos!: import("@angular/fire/compat/firestore").AngularFirestoreCollection<ProductoService>;

  textoBoton!: string;

  eliminarVisible: boolean = false;

  public logueado: boolean = false;

  constructor(private servicioStorage: StorageService, private servicioProductos: ProductoService, private auth: AuthService) { }

  ngOnInit(): void {

    // Traigo los productos de la base de datos
    this.servicioProductos.getProductos().subscribe((producto: any) => {
      this.productos = producto
    })

    // Verifico el estado del usuario, para poder editar los productos.
    this.auth.user.subscribe((user) => {
      if (user) {
        this.logueado = true;
      }
      else {
        this.logueado = false;
      }
    })

  }

  //Carga una imagen en el almacenamiento de Firebase y genera su URL
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
                      alert("Ocurri?? un error\nError: " + error)
                    })
                }
              )
          }
        )

    }
    else {
      alert("Hay campos vac??os")
    }
  }

  //Declaro el boton "Agregar Producto"
  mostrarDialogo() {
    this.imagen = ""
    this.textoBoton = "Agregar Producto"
    this.modalVisible = true;
  }

  //Toma los datos del formulario y crea un nuevo objeto
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

  mostrarEliminar(productos: Producto) {
    this.eliminarVisible = true
    this.productoSeleccionado = productos
  }

  eliminarProducto() {
    this.servicioProductos.deleteProducto(this.productoSeleccionado.idProducto)
      .then((resp: any) => {
        this.servicioStorage.eliminarImagen(this.productoSeleccionado.img)
        alert("El producto fue eliminado con ??xito")
      })
      .catch((err: string) => {
        alert("No se pudo eliminar el producto\nError: " + err)
      })
    this.eliminarVisible = false
  }

  //Establece el boton "Crear Producto" y vuelve verdadero la variable modalVisible
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

  // Agrega un producto nuevo o lo actualiza 
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

  // Toma el archivo y lo lee, luego establece el nombre y la URL de la imagen
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

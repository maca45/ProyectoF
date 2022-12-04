/* Import los modulos necesarios */
import { Component, OnInit, } from '@angular/core';
import { MenuItem } from 'primeng/api';

//formulario
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/model/usuarios';

import Swal from 'sweetalert2'; //esto es para el alert

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit {

  /* Creación de un grupo de formularios con dos controles de formulario. */
  Usuarios = new FormGroup({
    nombre: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required)
  })

  //declaraciones
  items: MenuItem[] = []

  /*  Un array de Usuarios. */
  coleccionUsuario: Usuarios[] = [];

  /* Una variable que se utiliza para mostrar el panel de administración.
      */
  adminVisible = false;

  /* Una variable que se utiliza para mostrar el modal. */
  modalVisible: boolean = false;

  /**
   * La función establece la propiedad modalVisible a true, lo que hace que se muestre el modal
   
   */
  showModalDialog() {
    this.modalVisible = true;
  }

  /**
   * Se llama a la función verificarUsuario(), que devuelve una promesa. Cuando la promesa se resuelve,
   * se llama a la función mostrar()*/

  mostrar() {
    this.verificarUsuario();
  }

  /**
   *Comprueba si el usuario existe en la base de datos y si lo hace, comprueba si la contraseña es correcta.
   *Si lo es, inicia la sesión del usuario y muestra el panel de administración  */

  verificarUsuario() {
    this.coleccionUsuario.forEach(usuario => {
      if (this.Usuarios.valid) {
        if (usuario.nombre === this.Usuarios.value.nombre!) {
          if (usuario.contrasena === this.Usuarios.value.contrasena!) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'success',
              title: 'Inicio Sesion Correctamente'
            })

            this.adminVisible = true;
            this.serviciosUsuarios.iniciarSesion()
            this.ngOnInit()

          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            Toast.fire({
              icon: 'error',
              title: 'La Contraseña es Incorrecta'

            })
          }
        }
        else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            title: 'Algunos de los Datos son Incorrectos',
            icon: 'info',

          })
        }
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          title: 'Los Campos Estan Vacios',
          icon: 'warning',
        })

      }
      this.modalVisible = false;
      this.Usuarios.reset();
    });
  }

  /**
   * La función constructora es una función por defecto que se ejecuta cuando se carga el componente
   * @param {UsuariosService} serviciosUsuarios - UsuariosService */


  constructor(private serviciosUsuarios: UsuariosService) { }


  ngOnInit(): void {
    this.items = [
      {
        label: '',
        icon: 'pi pi-home',
        routerLink: "/inicio"

      },

      {
        label: 'Productos',
        routerLink: '/producto',
      },
      {
        label: "Contactenos",
        icon: "pi pi-phone",
        routerLink: "/contacto"
      },
      {
        label: "Admin",
        icon: "pi pi-user-plus",
        routerLink: "/admin",
        visible: this.adminVisible,

      }
    ]

    /* Suscripción al observable devuelto por la función `obtenerUsuarios()` en el servicio
    servicio `UsuariosService`. */
    this.serviciosUsuarios.obtenerUsuarios().subscribe(usuarios => this.coleccionUsuario = usuarios)

  }
}
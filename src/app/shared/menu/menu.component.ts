import { Component, OnInit, } from '@angular/core';
import { MenuItem } from 'primeng/api';

//formulario
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios } from 'src/app/model/usuarios';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  
})
export class MenuComponent implements OnInit {
  Usuarios = new FormGroup({
    nombre: new FormControl ('', Validators.required),
    contrasena: new FormControl ('', Validators.required)
  })

//declaraciones
  items: MenuItem[] = []
  
  coleccionUsuario: Usuarios[] = [];
  adminVisible= false;
   //modalvisible es para mostrar el form
   modalVisible : boolean = false;
   

  
   showModalDialog() {
     this.modalVisible = true;
   }

   //MOSTRAMOS EL VERIFICAR USUARIO
  mostrar(){
    this.verificarUsuario();
  }
  verificarUsuario(){
    this.coleccionUsuario.forEach(usuario => {
      if(this.Usuarios.valid){
        if(usuario.nombre===this.Usuarios.value.nombre!){
          if(usuario.contrasena===this.Usuarios.value.contrasena!){
            alert ("Inicio sesión correctamente")
            this.adminVisible=true;
            this.ngOnInit()
          }else{
            alert ("La contraseña es incorrecta")
          }
        }
        else{
          alert ("algunos de los datos son incorrectos")
        }
      }else{
        alert("los campos están vacios")
      }
      this.modalVisible=false;
      this.Usuarios.reset();
    });
  }

  constructor(private serviciosUsuarios: UsuariosService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: '',
        icon: 'pi pi-home',
        routerLink: "/inicio"

      },
      
      {
        label: 'Articulos',
        icon: 'pi pi-shopping-bag',
      items:[
        { 
          label: "Aceites",
          routerLink: "aceites"
        },
        {
          label: "Frutos Secos",
          routerLink: "frutos-secos"
        },
        {
          label: "Harinas",
          routerLink: "harinas"
        },
        {
          label: "Leche",
          routerLink: "leche"
        },
        {
          label: "Mantecas",
          routerLink: "mantecas"
        },
        {
          label: "Yerba",
          routerLink: "yerba"
        },
        {
          label: "Shampoo",
          routerLink: "shampoo"
        }
      ]
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

    this.serviciosUsuarios.obtenerUsuarios().subscribe(usuarios=>this.coleccionUsuario=usuarios)

  } 
}
/* Import los modulos necesarios */
import { Component, OnInit, } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit {

public logueado: boolean= false ;
 
  //declaraciones
  items: MenuItem[] = []


  constructor(private auth:AuthService) { }


  ngOnInit(): void {
    this.auth.user.subscribe((user)=>{
      if(user){
        this.logueado=true;
      }else{
        this.logueado=false;
      }
    })

   /*Una array de objetos.*/
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
      
    ]

   
  }
  cerrarSesion(){
    this.auth.logOut().then(()=>
    {
    alert("Sesion cerrada con exito")
    Swal.fire({ //es una alerta de error de sweetalert2.
      icon: 'error',
      title: 'Oops...',
      text: 'La contraseña es incorrecta',
    })
   
    }).catch(()=>{
      alert("Problemas al Cerrar Sesion")
    }
    )

    }
  }

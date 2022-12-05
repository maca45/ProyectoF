import { Component, OnInit, } from '@angular/core';
import { MenuItem } from 'primeng/api';

//formulario
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: '',
        icon: 'pi pi-home',
        routerLink: "/inicio"

      },
      {
        label: 'Productos',
        icon: 'pi pi-shopping-bag',
        routerLink: '/producto'
      },
      {
        label: "Contactenos",
        icon: "pi pi-phone",
        routerLink: "/contacto"
      }
    ]
  } 
}
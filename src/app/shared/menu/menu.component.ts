import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
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
        routerLink: '/producto'
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

      }
    ]

  }
}
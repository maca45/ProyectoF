import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
 /* Una variable que se establece como falsa. */
  modalVisible:boolean=false;


/* Una variable que se establece como falsa */
  adminVisible=false;
  
  

  constructor() { }

  ngOnInit(): void {
  }

}

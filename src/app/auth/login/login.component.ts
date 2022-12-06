import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin:FormGroup;


  constructor(private fb:FormBuilder, private auth:AuthService, private  router:Router) {

    //inicializo mi formulario
    this.formularioLogin=fb.group({
      username: ['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
   }

  ngOnInit(): void {

  }
  iniciarSesion(){
    //pregunta si el formulario es valido
    if(!this.formularioLogin.invalid){
      //obtengo esos datos del formulario
      const{username,password}=this.formularioLogin.value;
      //inicio sesion en firebase llamando al metodo de mi servicio
      this.auth.login(username, password).then((resp)=>{
        alert("iniciaste sesion de forma correcta");
      this.router.navigateByUrl('producto')
      }).catch(error=>{
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: 'Datos incorrectos',
          text: "verifique si el email o la contraseña",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true
        })
        alert("datos incorrectos, verifique si el email o la contraseña son de un usuario valido")
      })
     
      
    }
    else{
      alert("revise los datos, son incorrectos");
    }
  }

}

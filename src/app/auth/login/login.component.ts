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
        alert(resp);
      this.router.navigateByUrl('producto')
      }).catch(error=>{
        alert(error)
      })
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
    else{
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

}

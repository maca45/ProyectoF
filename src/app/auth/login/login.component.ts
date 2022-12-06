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

/* Una variable que se utiliza para almacenar los datos del formulario. */
  formularioLogin:FormGroup;


  /* Una inyección de dependencia. */
  constructor(private fb:FormBuilder, private auth:AuthService, private  router:Router) {

    //inicializo mi formulario
    this.formularioLogin=fb.group({
      username: ['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    })
   }

  ngOnInit(): void {

  }
  /**
   * Comprueba si el formulario es válido, si lo es, obtiene el nombre de usuario y la contraseña del formulario, entonces
   * llama al método de inicio de sesión del servicio auth, si el inicio de sesión es correcto, navega a la
   * página del producto, si no lo es, muestra un mensaje de error.
   */
  iniciarSesion(){
    //pregunta si el formulario es valido
    if(!this.formularioLogin.invalid){
      //obtengo esos datos del formulario
      const{username,password}=this.formularioLogin.value;
      //inicio sesion en firebase llamando al metodo de mi servicio
      this.auth.login(username, password).then((resp)=>{
        Swal.fire({
          icon: 'success',
          title: 'Inicio Sesion Correctamente',
          showConfirmButton: false,
          timer: 2500
        })
        
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
          text: "Verifique si el email o la contraseña son de un usuario valido",
          icon: 'info'
        })

      })
     
      
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Revise los datos, son incorrectos',
      })
      
    }
  }

}

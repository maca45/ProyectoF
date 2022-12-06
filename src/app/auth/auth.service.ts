import { Injectable, resolveForwardRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 /* Una aserción de tipo. Indica al compilador que la variable de usuario es un Observable de cualquier tipo. */
  public user!: Observable <any>;

  constructor(private auth: AngularFireAuth) { 
    this.user=this.auth.authState
  }

//metodo para iniciar sesion y para obtener los parametro necesarios
  /**
   * La función login toma un nombre de usuario y una contraseña, y devuelve una promesa que resuelve a un usuario
   * objeto
   * @param {string} nombre de usuario - cadena, contraseña:cadena
   * @param {string} password - La contraseña del usuario.
   * @returns Se devuelve la promesa.
   */
  login(username: string, password:string){
    return this.auth.signInWithEmailAndPassword(username, password)
  
  }
  

  //este metodo va a cerrar la sesion
  /**
   * La función logOut() es un método de la clase AuthService. Devuelve el resultado del método signOut()
   * de la propiedad auth de la clase AuthService
   * @returns El método signOut() devuelve una promesa.
   */
  logOut(){
   return this.auth.signOut();
  }

/**
 * Esta función devuelve el estado de autenticación del usuario actual.
 */
currentUser(){
  this.auth.authState;
}

}

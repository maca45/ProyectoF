import { Injectable, resolveForwardRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user!: Observable <any>;

  constructor(private auth: AngularFireAuth) { 
    this.user=this.auth.authState
  }

//metodo para iniciar sesion y para obtener los parametro necesarios
  login(username: string, password:string){
    return this.auth.signInWithEmailAndPassword(username, password)
  
  }
  

  //este metodo va a cerrar la sesion
  logOut(){
   return this.auth.signOut();
  }

currentUser(){
  this.auth.authState;
}

}

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
    return new Promise((resolve, rejects)=>{
      try{
       this.auth.signInWithEmailAndPassword(username, password);
       resolve("iniciaste sesion de forma correcta")
      } catch(error){
          rejects(error);
        }
    })

    
  }

  //este metodo va a cerrar la sesion
  logOut(){
    this.auth.signOut();
  }

currentUser(){
  this.auth.authState;
}

}

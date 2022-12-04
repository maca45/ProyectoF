import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from './servicios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class PatovaGuard implements CanActivate {
  constructor(private servicioLogin:UsuariosService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.servicioLogin.estaLogueado()){
        return true
      }
      else{
        return false
      }
  }
  
}
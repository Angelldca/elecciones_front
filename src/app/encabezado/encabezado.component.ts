import { Component, Input, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../oauth.service';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {

  area = this.authService.getArea();
 constructor( private authService: AuthService){
}
logOut(){
  this.authService.logout()
}
}

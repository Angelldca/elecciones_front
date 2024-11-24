import { Component, Input, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {

 @Input({ transform: booleanAttribute }) isLoged: boolean | undefined;
 constructor(){
}
logOut(){
  console.log("log out")
}
}

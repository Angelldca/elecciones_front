import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import {urlBack} from '../Finals'

import { AuthService } from '../oauth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  mostrarMensaje = true;
  mostrarContrasena=true;

  userForm = new FormGroup({
    username : new FormControl(''),
    password : new FormControl('')
  });

  constructor( private oauthService: AuthService, private router: Router )  {

  }

  ngOnInit(): void {
    const token = localStorage.getItem('access_token')
    const area = localStorage.getItem('area')
   
    const route = this.router
    if(token && area){
        this.oauthService.validateToken(token).subscribe({
         next(data) {
           route.navigate(['home']);     
         },
         error(err) {
           console.log("Token invalid or expired")
         },
       })
     }
  }
  
  onInput1(event: any) {
    if (event.target.value.trim() !== '') {
      this.mostrarMensaje = false;
    } else {
      this.mostrarMensaje = true;
    }
  }

  onInput2(event: any) {
    if (event.target.value.trim() !== '') {
      this.mostrarContrasena = false;
    } else {
      this.mostrarContrasena = true;
    }
  }
  onSubmit(){
    this.loginCiudadano(this.userForm.value);
  }
 
  loginCiudadano(data: any){
    this.oauthService.login(data.username, data.password).subscribe({
      next: data => { 
        console.log(data)
        this.oauthService.storeToken(data.access,data.refresh) 
          this.router.navigate(['bienvenido']);
          localStorage.setItem('area', data.area);
          this.router.navigate(['home']);
        }, 
      error: (error) => {
        console.log(error)
        Swal.fire({
          title: 'Oops...',
          text: error.error.non_field_errors[0],
          icon: 'error',
          footer: ``,
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'btn btn-success px-4',
          },
          buttonsStyling: true,
          })
       
      }, // error path
    })
  }
  limpiarInputs(){
    console.log("Acuerdate de limpiar los inputs")
  }

  loginCass(){
    //window.location.href = 'http://localhost:8000/accounts/login'
  }
}

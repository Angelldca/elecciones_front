import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'
import { IEstudiante, IPersona, ScanerService } from '../scaner.service';
import { AuthService } from '../oauth.service';


@Component({
  selector: 'app-scaner',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './scaner.component.html',
  styleUrl: './scaner.component.css'
})


export class ScanerComponent implements AfterViewInit, OnInit {
  cantidad = 100;
  facultad : string | null = '';
  scannedCode: string = '';
  nombre = ""
  solapin =''
  dni=''
  grupo =''
  img =''
  area = '';
  activo = true;
  acceso = true;
  estudiantes: IPersona[] = [];
  stats = {
    facultad: '',
    total: 0,
    con_acceso: 0,
    porciento: 0
  }
 constructor(private scanerService :ScanerService, private authService: AuthService){}
 ngOnInit(): void {
  this.facultad = this.authService.getArea();
   this.getStatsFacultad(this.facultad)
 }
 getStatsFacultad(facultad:string | null){
  if(facultad)
  this.scanerService.getStatsFacultad(facultad).subscribe({
    next: data => {
      
      this.stats.facultad = data.facultad;
      this.stats.total = data.total;
      this.stats.con_acceso = data.con_acceso;
      this.stats.porciento = data.porciento;
      this.estudiantes = data.personas;

      if(this.stats.con_acceso ==2){
        const votante = this.estudiantes[0];
        this.alertVoto(`Voto número 22 \n${votante.nombre} \n Solapín: ${votante.solapin}`)
      }
      if(this.stats.con_acceso ==3){
        const votante = this.estudiantes[0];
        this.alertVoto(`Voto número 102 \n${votante.nombre} \n Solapín: ${votante.solapin}`)
      }

     ;
    }, // success path
    error: error => {
      console.log(error)
    }, // error path
  })
 }
 
 alertVoto(mensaje: string){
  Swal.fire({
    title: mensaje,
    width: 600,
    padding: "3em",
    color: "#202A62",
    background: "#fff url(/images/trees.png)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("/assets/img/bday-303.gif")
      center
      repeat
    `
  });
 }
 makeActive(solapin:string){
  this.scanerService.makeActive(solapin).subscribe({
    next: data => {
      console.log(data)
      this.nombre = data.persona.nombre;
      this.img = data.imagen.imagen;
      this.solapin = data.persona.solapin;
      this.dni = data.persona.ci
      this.grupo = data.persona.grupo
      this.area = data.persona.facultad;
      this.acceso = data.persona.acceso;
      this.activo = data.persona.activo;
      this.getStatsFacultad(this.facultad)

     ;
    }, // success path
    error: error => {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.error.error,
      });
    }, // error path
  })
 }
onScan() {
    console.log('Código escaneado:', this.scannedCode);
    if(this.scannedCode !== null && this.scannedCode.trim() !== '' && this.scannedCode !== undefined ){
      this.scanerService.getEstudianteCodigoBarra(this.scannedCode).subscribe({
        next: data => {
          console.log(data.imagen)
          this.nombre = data.persona.nombre;
          this.img = data.imagen.imagen;
          this.solapin = data.persona.solapin;
          this.dni = data.persona.ci
          this.grupo = data.persona.grupo
          this.area = data.persona.facultad;
          this.acceso = data.persona.acceso;
          this.activo = data.persona.activo;
          this.getStatsFacultad(this.facultad)
        }, // success path
        error: error => {
          
          if(error.error.error === 'Estudiante inactivo'){
            Swal.fire({
              title: error.error.error,
              text: "¿Desea registrar el voto?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, añadir!"
            }).then((result) => {
              if (result.isConfirmed) {
                this.makeActive(error.error.persona.solapin)
                Swal.fire({
                  title: "Voto registrado",
                  text: "Los datos de la persona han sido añadidos correctamente",
                  icon: "success"
                });
              }
            });
          }else{
            Swal.fire({
              icon: "warning",
              title: "Voto no registrado",
              text: error.error.error,
            });
          }
         
        }, // error path
      })
    }

    // limpiar Codigo despues de la operaciones;
    this.scannedCode = '';
}
@ViewChild('scannerInput', { static: false }) scannerInput!: ElementRef;
refocusInput(): void {
  // Vuelve a enfocar el campo de entrada si pierde el foco
  setTimeout(() => this.scannerInput.nativeElement.focus(), 0);
}
ngAfterViewInit(): void {
  // Enfocar el campo al cargar el componente
  this.scannerInput.nativeElement.focus();
}
}

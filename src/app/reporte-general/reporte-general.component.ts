import { Component, OnInit } from '@angular/core';
import { IPersona, ScanerService } from '../scaner.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { urlBack } from '../Finals';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-reporte-general',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reporte-general.component.html',
  styleUrl: './reporte-general.component.css'
})
export class ReporteGeneralComponent implements OnInit{
  estudiantes: IPersona[] = [];
  facultad = "Facultad de Tecnologías Interactivas";
  stats = {
    facultad: '',
    total: 0,
    con_acceso: 0,
    sin_acceso: 0,
    porciento_restante:0,
    porciento: 0
  }
  constructor(private httpClient: HttpClient, private scanerService :ScanerService){}
  selectedOption: string = 'listado_completo'; // Opción por defecto
  options: { value: string; label: string }[] = [
    { value: 'listado_completo', label: 'Listado de estudiantes' },
    { value: 'votos_realizados', label: 'Estudiantes con voto ejercido' },
    { value: 'votos_faltantes', label: 'Estudiantes sin votar' },
  ];

  onOptionChange(event: Event){
    console.log(this.selectedOption)
    if(this.selectedOption === 'listado_completo') this.getTotal();
    if(this.selectedOption === 'votos_realizados') this.getConAcceso();
    if(this.selectedOption === 'votos_faltantes') this.getSinAcceso();
  }

  ngOnInit(): void {
    this.getStats(); 
    if(this.selectedOption === 'listado_completo') this.getTotal();
    if(this.selectedOption === 'votos_realizados') this.getConAcceso();
    if(this.selectedOption === 'votos_faltantes') this.getSinAcceso();
    
  }
  getStats(){
    this.scanerService.getStats().subscribe({
      next: data => {

        this.stats.facultad = data.facultad;
        this.stats.total = data.total;
        this.stats.con_acceso = data.con_acceso;
        this.stats.sin_acceso = data.sin_acceso;
        this.stats.porciento_restante = data.porciento_restante;
        this.stats.porciento = data.porciento;

        //this.estudiantes = data.personas;
  
       ;
      }, // success path
      error: error => {
        console.log(error)
      }, // error path
    })
   }

   getSinAcceso(){
    this.scanerService.getSinAccesoGeneral().subscribe({
      next: data => {
        console.log(data)
        this.estudiantes = data.personas;
     
      }, // success path
      error: error => {
        console.log(error)
      }, // error path
    })
   }
   getTotal(){
    this.scanerService.getTotalGeneral().subscribe({
      next: data => {
        console.log(data)
           this.estudiantes = data.personas;
     
      }, // success path
      error: error => {
        console.log(error)
      }, // error path
    })
   }
   getConAcceso(){
    this.scanerService.getConAccesoGeneral().subscribe({
      next: data => {
        console.log(data)
           this.estudiantes = data.personas;
     
      }, // success path
      error: error => {
        console.log(error)
      }, // error path
    })
   }


   //Download csv
   download(){
    let url = `csv/csv_listado_completo`;
    if(this.selectedOption === 'listado_completo') url = `csv/csv_listado_completo`;
    if(this.selectedOption === 'votos_realizados') url = `csv/csv_listado_con_acceso`;
    if(this.selectedOption === 'votos_faltantes') url = `csv/csv_listado_sin_acceso`;
     this.donwloadListEstudiantes(url,this.selectedOption);
   }
   donwloadListEstudiantes(url_csv: string, name:string){
  
    const url = `${urlBack + url_csv}`
    this.httpClient.get(url, { responseType: 'blob'})
        .pipe(
            catchError((error: HttpErrorResponse) => {
                console.error('Error en la solicitud:', error);
                return throwError('Error en la solicitud. Por favor, inténtalo de nuevo más tarde.');
            })
        )
        .subscribe((response: Blob) => {
            const blob = new Blob([response], { type: 'text/csv' });
            const downloadUrl = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `${name}_general.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(downloadUrl);
        });
  
  }
}

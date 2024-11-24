import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, catchError, retry, throwError } from 'rxjs';
import { urlBack } from './Finals';

@Injectable({
    providedIn: 'root',
    
  })
export class ScanerService {

    constructor(private http: HttpClient) {
    }
    getEstudianteCodigoBarra(codigobarra: string) {
      
        return this.http.get<IEstudiante>(urlBack + `personas/persona_con_imagen?codigobarra=${codigobarra}`);
      
      }
      makeActive(solapin: string) {
        
        return this.http.get<IEstudiante>(urlBack + `personas/cambiar_estado_activo?solapin=${solapin}`);
      
      }
      getStatsFacultad(facultad: string) {
      
        return this.http.get<Stats>(urlBack + `stats/${facultad}/`);
      
      }
      getSinAcceso(facultad: string) {
        console.log(urlBack + `personas/personas_sin_acceso?facultad=${facultad}`)
        return this.http.get<any>(urlBack + `personas/personas_sin_acceso?facultad=${facultad}`);
      }
      getTotal(facultad: string) {
        return this.http.get<Stats>(urlBack + `personas/personas_activas?facultad=${facultad}`);
      }
      getConAcceso(facultad: string) {
        return this.http.get<Stats>(urlBack + `personas/personas_con_acceso?facultad=${facultad}`);
      }
  
}
interface Stats {
  facultad: string,
  total: number,
  con_acceso: number,
  porciento: number,
  sin_acceso: 0,
  porciento_restante:0,
  personas: IPersona[]
}
export interface IPersona {
  nombre:string,
  ci:string,
  carrera: string,
  facultad: string,
  grupo: string,
  anno_academico: string,
  provincia: string,
  municipio: string,
  activo: boolean,
  acceso: boolean,
  fecha: Date,
  solapin: string
}
export interface IEstudiante {
  persona :{
    idpersona: number,
    nombre:string,
    ci:string,
    carrera: string,
    facultad: string,
    grupo: string,
    anno_academico: string,
    provincia: string,
    municipio: string,
    activo: boolean,
    acceso: boolean,
    fecha: Date,
    solapin: string
  },
  imagen: {
    "idpersona": number,
    "imagen": string}


}
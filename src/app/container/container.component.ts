import { Component, OnInit } from '@angular/core';
import { EncabezadoComponent } from '../encabezado/encabezado.component';
import { PiePaginaComponent } from '../pie-pagina/pie-pagina.component';
import { MenuPrincipalComponent } from '../menu-principal/menu-principal.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-containerCD',
  standalone: true,
  imports: [EncabezadoComponent, PiePaginaComponent, MenuPrincipalComponent, RouterOutlet],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
    const route = this.router
    route.navigate(['home/scaner']); 
  }
}

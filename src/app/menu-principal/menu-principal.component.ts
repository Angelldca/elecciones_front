import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './menu-principal.component.html',
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {
 

  showSubmenu(elements: string) {
  
    
  }

  hideSubmenu(elements: string) {
 
  }
  }

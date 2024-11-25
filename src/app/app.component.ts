
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthInterceptor } from './interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'elecciones';
}

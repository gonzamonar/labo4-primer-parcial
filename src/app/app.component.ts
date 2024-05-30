import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SessionService } from './services/session.service';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  constructor(
    public auth: Auth,
    public session: SessionService
  ){ }


  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        if (this.auth.currentUser){
          this.session.updateSession(this.auth.currentUser);
        }
      }
    });
  }
}

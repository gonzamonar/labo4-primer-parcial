import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { browserLocalPersistence, getAuth, inMemoryPersistence, setPersistence } from 'firebase/auth';
import { SessionService } from '../../services/session.service';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io
import { signOut } from 'firebase/auth';
import { DataGithubService } from '../../services/data-github.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  loginError: boolean = false;
  email: string = '';
  password: string = '';
  rememberLogin: boolean = false;
  githubUser: any | null = null;

  constructor(
    public auth: Auth,
    public session: SessionService,
    public github: DataGithubService
  ) {
    this.fetchGithubData();
  }

  fetchGithubData(){
    this.github.fetchUserData("gonzamonar").subscribe(
      response => {
        this.githubUser = response;
    });
  }

  LoginAuth() {
    let persistence = this.rememberLogin ? browserLocalPersistence : inMemoryPersistence ;

    setPersistence(this.auth, persistence)
    .then(() =>
      signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then(
        (response) => {
          this.session.updateSession(response.user);
        }
      ).catch((e) => {
        this.loginError = true;
      })
    )
    .catch((error) => {
      console.error('Error setting session persistence:', error);
    });
  }

  Logout() {
    signOut(this.auth).then(
      () => {
        Swal.fire({
          title: "¿Deseas cerrar sesión?",
          text: "",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#42b54d",
          confirmButtonText: "Sí, salir",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "¡Sesión cerrada!",
              text: "Tu sesión fue cerrada exitosamente.",
              icon: "success"
            });
            this.session.closeSession();
          }
        });
    })
  }


  quickAccess(email: string, pwd: string){
    this.email = email;
    this.password = pwd;
  }
}

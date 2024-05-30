import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(
        {
        'apiKey': "AIzaSyC9H57Efjp-AJEtV84jMIf_neFUjVAVcVg",
        'authDomain': "gonzamonar-pp.firebaseapp.com",
        'projectId': "gonzamonar-pp",
        'storageBucket': "gonzamonar-pp.appspot.com",
        'messagingSenderId': "1069674930677",
        'appId': "1:1069674930677:web:1b7c3b4f48e58a5b61c0bc"
      }
    )), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    importProvidersFrom(HttpClientModule), provideFirebaseApp(() => initializeApp({"projectId":"gonzamonar-pp","appId":"1:1069674930677:web:1b7c3b4f48e58a5b61c0bc","storageBucket":"gonzamonar-pp.appspot.com","apiKey":"AIzaSyC9H57Efjp-AJEtV84jMIf_neFUjVAVcVg","authDomain":"gonzamonar-pp.firebaseapp.com","messagingSenderId":"1069674930677"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
    ]
};

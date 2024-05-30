import { Injectable } from '@angular/core';
import { Repartidor } from '../models/repartidor';
import { addDoc, collection, getDocs, limit, query, where } from 'firebase/firestore';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io

@Injectable({
  providedIn: 'root'
})
export class DataRepartidoresService {
  table: string = 'repartidores';

  constructor(private firestore: Firestore) { }

  
  pushOne(repartidor: Repartidor){
    let dataCollection = collection(this.firestore, this.table);
    
    addDoc(dataCollection, {
      'dni': repartidor.dni,
      'nombre': repartidor.nombre,
      'edad': repartidor.edad,
      'capacidadDeTransporte': repartidor.capacidadDeTransporte,
      'pais': repartidor.pais,
      'unidadPropia': repartidor.unidadPropia,
    });

    Swal.fire("¡Alta exitosa!");
  }


  public fetchAll(): Observable<any> {
    let col = collection(this.firestore, this.table);
    return collectionData(col);
  }


  async fetchOne(dni: number): Promise<any> {
    let col = collection(this.firestore, this.table);
    const fetchQuery = query(
      col, 
      where("dni", "==", dni),
      limit(1),
    );
    const querySnapshot = await getDocs(fetchQuery);
    return querySnapshot.docs[0].data();
  }

}

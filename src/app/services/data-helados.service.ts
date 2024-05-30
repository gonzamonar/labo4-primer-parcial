import { Injectable } from '@angular/core';
import { Helado } from '../models/helado';
import { Repartidor } from '../models/repartidor';
import { addDoc, collection, deleteDoc, getDocFromServer, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'; //https://sweetalert2.github.io


@Injectable({
  providedIn: 'root'
})


export class DataHeladosService {
  table: string = 'helados';

  constructor(private firestore: Firestore) { }

  pushOne(helado: Helado){
    let dataCollection = collection(this.firestore, this.table);
    
    addDoc(dataCollection, {
      'id': helado.id,
      'sabor': helado.sabor,
      'tipo': helado.tipo,
      'precio': helado.precio,
      'peso': helado.peso,
    });

    Swal.fire("¡Alta exitosa!");
  }

  async bajaHelado(helado: Helado){
    let col = collection(this.firestore, this.table);
    const fetchQuery = query(
      col, 
      where("id", "==", helado.id),
      limit(1),
    );
    const querySnapshot = await getDocs(fetchQuery);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      Swal.fire("¡Baja exitosa!");
    });
  }

  async modificacionHelado(helado: Helado){
    let col = collection(this.firestore, this.table);
    const fetchQuery = query(
      col, 
      where("id", "==", helado.id),
      limit(1),
    );
    const querySnapshot = await getDocs(fetchQuery);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, {
        'tipo': helado.tipo,
        'precio': helado.precio,
        'peso': helado.peso,
      });
      
      Swal.fire("¡Modificación exitosa!");
    });
  }

  public fetchAll(): Observable<any> {
    let col = collection(this.firestore, this.table);
    return collectionData(col);
  }

  async fetchOne(id: number): Promise<any> {
    let col = collection(this.firestore, this.table);
    const fetchQuery = query(
      col, 
      where("id", "==", id),
      limit(1),
    );
    const querySnapshot = await getDocs(fetchQuery);
    return querySnapshot.docs[0].data();
  }
}

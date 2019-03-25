import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { news } from './models/news';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(public firestore: AngularFirestore) { }
  createnews(
    title: string,
    shortdesc: string,
    Description: string,
    date: string,
    image: string
  ): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`newsList/${id}`).set({
      id,
      title,
      shortdesc,
      Description,
      date,
      image,
    });
  }
  updateNews(id, title, shortdesc, Description, date, image): Promise<void> {
     return this.firestore.doc(`newsList/${id}`).set({
      id,
      title,
      shortdesc,
      Description,
      date,
      image,
    });

  }
  getNews(): AngularFirestoreCollection<news> {
    return this.firestore.collection('newsList');
  }

  deleteNews(newsid: string): Promise<void> {
    return this.firestore.doc(`newsList/${newsid}`).delete();
  }
  login(email , password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email , password)
      .then(res => {
        resolve(res);
      }, err => reject(err) );
    });
  }
}

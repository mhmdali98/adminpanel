import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import {NewsService} from '../news.service';
@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {
  title: any;
  downloadURL: Observable<string>;
  image: any;
  date: any;
  news = {
    title: null,
    shortDesc: null,
    Description: null,
    date: null,
    image: null
  };
  constructor(private storage: AngularFireStorage, public _NewsService: NewsService) { }

  ngOnInit() {
    const date = new Date();
    this.date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

  }
  save(form) {
    console.log(form.value.describtion);
    console.log(form.value.shortDesc);
    console.log(form.value.title);
    console.log(this.image);
    if (this.image ) {
    this._NewsService.createnews(form.value.title, form.value.shortDesc, form.value.describtion, this.date, this.image).then(
      (res) => {
      alert('Add Seccessfully');
      this.image = '';
    });

  } else {
    alert('upload failed please refresh your browser and try again and not missing any record');
  }
  }
  async uploadImage(event) {
    const file = event.target.files[0];
    const path = `posts/${Math.floor(Math.random() * 255) + 1 }`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task =  await this.storage.upload(path, file).then(res => {
        console.log(res);
      });
      const ref = this.storage.ref(path);
      this.downloadURL = ref.getDownloadURL();
      await this.downloadURL.subscribe(url => {
        console.log(url);
        alert(url);
        if (this.image != null) {
          this.image = null;
        }
        this.image = url;
      });
    }
  }

}

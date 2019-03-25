import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.css']
})
export class UpdateNewsComponent implements OnInit, AfterViewInit {
news: any;
downloadURL: Observable<string>;
image: any;
date: any;
data = {
  title: null,
  shortdesc: null,
  Description: null,
  image: null,
  id: ''
};
  constructor(public router: ActivatedRoute ,
     private storage: AngularFireStorage ,
      public _NewsService: NewsService,
      private route: Router) { }
title;
shortdesc;
Description;

  ngOnInit() {
    const date = new Date();
    this.date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    this.router.params.subscribe( data => {
      this.title = data.title;
      this.shortdesc = data.shortdesc;
      this.Description = data.Description;
      this.data.id = data.id;
      this.image = data.image;
      console.log(this.data);
    });
   }
   ngAfterViewInit(): void {

  }
   uploadImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task =  this.storage.upload(path, file).then(res => {
        console.log(res);
      });
      const ref = this.storage.ref(path);
      this.downloadURL = ref.getDownloadURL();
      console.log('Image Uploaded!');
      this.downloadURL.subscribe(url => (this.image = url));
    }
   }
   save() {
    console.log(this.data.id);
    console.log(this.title);
    console.log(this.shortdesc);
    console.log(this.Description);
    console.log(this.image);
    if (this.image ) {

   this._NewsService.updateNews(this.data.id, this.title , this.shortdesc , this.Description , this.date, this.image).then((res) => {
     console.log(res );
     alert('updated successfully ');
     this.route.navigate(['all-news']);
   });
  } else {
    alert('upload failed please refresh your browser and try again and not missing any record');
  }
   }

}

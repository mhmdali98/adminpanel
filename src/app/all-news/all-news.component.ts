import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NewsService } from '../news.service';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit,  AfterViewInit {
  Data: any;
  newsList: Observable<any[]>;
  constructor(private firestoreService: NewsService, public router: Router) {
   }

  ngOnInit() {
    this.newsList = this.firestoreService.getNews().valueChanges();

    console.log(this.newsList);
  }
  ngAfterViewInit(): void {
    this.newsList.subscribe( data => {
      console.log(data);
      this.Data = data;
    });
  }
  del(item) {
    this.firestoreService.deleteNews(item).then( () => {
      alert('deleted successfully');
    });
  }
  up(item) {
    this.router.navigate(['update-news', item]);
    console.log(item);
  }

}

import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public _NewsService: NewsService, private router: Router) { }

  ngOnInit() {
  }
  signIn(f ) {
    console.log('' + f.value.email);
    this._NewsService.login(f.value.email, f.value.password).then( () => {
      this.router.navigate(['add-news']);
    }, (err) => {
      alert( err );
    });
  }

}

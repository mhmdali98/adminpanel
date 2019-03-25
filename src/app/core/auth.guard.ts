import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isloggedin = false;
  constructor(
    public afAuth: AngularFireAuth,
    public userService: AuthService,
    private router: Router
  ) {}
  canActivate(): boolean {
    const authObserver = this.afAuth.authState.subscribe(user => {
      if (!user) {
        this.router.navigate(['login']);
        this.isloggedin = false;
        authObserver.unsubscribe();
      } else {
        this.isloggedin = true;
        authObserver.unsubscribe();
      }
    });
    return this.isloggedin;
}
}

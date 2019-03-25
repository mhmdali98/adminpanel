import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { RouterModule, Routes } from '@angular/router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// tslint:disable-next-line:import-spacing
import { MatFormFieldModule} from'@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material';

import { MatDatepickerModule, MatNativeDateModule, MatCardModule, MatButtonModule, MatTableModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './app.firebase';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NewsService } from './news.service';
import { ScrollableDirective } from './scrollable.directive';
import { CdkColumnDef } from '@angular/cdk/table';
import { UpdateNewsComponent } from './update-news/update-news.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import {APP_BASE_HREF} from '@angular/common';
import { DashComponent } from './dash/dash.component';

/*
const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent },
  ] },
  { path: 'shopping-list', component: ShoppingListComponent },
];


*/
const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'add-news',
    component: AddNewsComponent,
    canActivate: [ AuthGuard]
  },
  {
    path : 'all-news',
    component: AllNewsComponent,
    canActivate: [ AuthGuard]
  },
  {
    path: 'update-news',
    component: UpdateNewsComponent,
    canActivate: [ AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dash',
    component: DashComponent,
    canActivate: [ AuthGuard]

  }
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    AddNewsComponent,
    AllNewsComponent,
    ScrollableDirective,
    UpdateNewsComponent,
    LoginComponent,
    DashComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatGridListModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule
  ],
  providers: [ NewsService, AuthGuard , {provide: APP_BASE_HREF, useValue : '/'}],
  // tslint:disable-next-line:no-trailing-whitespace
  bootstrap: [AppComponent ] 

})
export class AppModule { }

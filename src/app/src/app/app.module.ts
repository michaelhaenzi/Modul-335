import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';

import { CustomHttpService } from './services/custom-http-service/custom-http.service';
import { AuthService } from './services/auth-service/auth.service';
import { LoginService } from './services/login-service/login.service';
import { ChatService } from './services/entity-service/chat-service/chat.service';

import { AuthContextService } from './context/auth-context/auth-context.service';
import { CustomHttpContextService } from './context/http-context/custom-http-context.service';
import { ChatListComponent } from './pages/chat/list/chat-list.component';
import { ChatDetailComponent } from './pages/chat/detail/chat-detail.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chats', component: ChatComponent, children: [
    { path: ':id', component: ChatDetailComponent },
    { path: '', component: ChatListComponent }
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    ChatListComponent,
    ChatDetailComponent,
    ChatComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CustomHttpService,
    AuthService,
    LoginService,
    AuthContextService,
    CustomHttpContextService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

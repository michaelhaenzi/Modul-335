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
import { EventsService } from './services/events.service';

import { CustomHttpContextService } from './context/http-context/custom-http-context.service';
import { ChatListComponent } from './pages/chat/list/chat-list.component';
import { ChatDetailComponent } from './pages/chat/detail/chat-detail.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ContactListComponent } from './pages/contact/list/contact-list.component';
import { SettingsComponent } from './pages/auth/settings/settings.component';
import { ContactComponent } from './pages/contact/contact/contact.component';
import { ContactDetailComponent } from './pages/contact/detail/contact-detail.component';

/**
 * Creator: ACN
 * Date: 4.12.2016
 */
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chats', component: ChatComponent, children: [
    { path: ':id', component: ChatDetailComponent },
    { path: '', component: ChatListComponent }
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', component: ContactComponent, children: [
    { path: ':id', component: ContactDetailComponent },
    { path: '', component: ContactListComponent }
  ]  },
  { path: 'settings', component: SettingsComponent },
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
    RegisterComponent,
    ContactListComponent,
    SettingsComponent,
    ContactComponent,
    ChatDetailComponent,
    ContactDetailComponent
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
    CustomHttpContextService,
    ChatService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

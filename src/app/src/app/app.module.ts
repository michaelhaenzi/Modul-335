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
import { UserService } from './services/entity-service/user-service/user.service';
import { EventsService } from './services/events.service';
import { UserSearchService } from './services/entity-service/user-search/user-search.service';
import { SettingsService } from './services/entity-service/settings-service/settings.service';

import { CustomHttpContextService } from './context/http-context/custom-http-context.service';
import { ChatListComponent } from './pages/chat/list/chat-list.component';
import { ChatDetailComponent } from './pages/chat/detail/chat-detail.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ContactListComponent } from './pages/contact/list/contact-list.component';
import { SettingsComponent } from './pages/auth/settings/settings.component';
import { ContactComponent } from './pages/contact/contact/contact.component';
import { ContactDetailComponent } from './pages/contact/detail/contact-detail.component';
import { NewChatComponent } from './pages/chat/new/new-chat.component';
import { ContactFormComponent } from './pages/contact/form/contact-form.component';
import { UserSearchComponent } from './pages/contact/search/user-search.component';

/**
 * Creator: ACN
 * Date: 4.12.2016
 */
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chats', component: ChatComponent, children: [
    { path: ':id', component: ChatDetailComponent },
    { path: 'new/:id', component: NewChatComponent },
    { path: '', component: ChatListComponent }
  ] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', component: ContactComponent, children: [
    { path: ':id', component: ContactDetailComponent },
    { path: '', component: ContactListComponent }
  ]  },
  { path: 'form/contacts', component: ContactFormComponent },
  { path: 'search/contacts', component: UserSearchComponent },
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
    ContactDetailComponent,
    NewChatComponent,
    ContactFormComponent,
    UserSearchComponent
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
    UserService,
    EventsService,
    UserSearchService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

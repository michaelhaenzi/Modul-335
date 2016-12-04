import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth-service/auth.service";
import {Router} from "@angular/router";
import {EventsService} from "./services/events.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isLoggedIn: boolean;
  public sideMenuDisplay: boolean = false;

  /**
   * Konstruktor
   */
  constructor(private authService: AuthService, private router: Router, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    var self = this;
    this.eventsService.on("auth:login", function () {
      self.isLoggedIn = true;
      self.authService.setLoggedIn();
      self.router.navigateByUrl('/');
    });
  }

  /**
   * öffnet das Seiten Menü
   */
  public openSideMenu(): void {
    this.sideMenuDisplay = !this.sideMenuDisplay;
  }

  public preLogout(): void {
    this.openSideMenu();
    this.logout();
  }

  public logout(): void {
    this.authService.doLogout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth-service/auth.service";
import {Router} from "@angular/router";
import {EventsService} from "./services/events.service";

/**
 * Creator: ACN
 * Date: 4.12.2016
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isLoggedIn: boolean;
  public sideMenuDisplay: boolean = false;
  public viewBack: boolean = false;
  public backRoute: string = "";
  public title: string = "Home";
  public showSearch: boolean = false;
  public searchString: string = "";
  public goToContact: boolean = false;
  public contactString: string = "";

  /**
   * Konstruktor
   */
  constructor(private authService: AuthService, private router: Router, private eventsService: EventsService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    var self = this;
    this.eventsService.register("auth:login", function () {
      self.authService.setLoggedIn();
      self.isLoggedIn = true;
      self.router.navigateByUrl('/');
    });
    this.eventsService.register("route:back", function (viewBack: boolean, backRoute: string, title: string, showSearch: boolean, searchString: string, goToContact: boolean, contactString: string) {
      self.viewBack = viewBack;
      self.backRoute = backRoute;
      self.title = title;
      self.showSearch = showSearch;
      self.searchString = searchString;
      self.goToContact = goToContact;
      self.contactString = contactString;
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
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}

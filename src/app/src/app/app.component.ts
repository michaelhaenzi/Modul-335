import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth-service/auth.service";
import {Router} from "@angular/router";

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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  /**
   * öffnet das Seiten Menü
   */
  public openSideMenu(): void {
    this.sideMenuDisplay = !this.sideMenuDisplay;
  }
}

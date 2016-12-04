import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./../../services/auth-service/auth.service";

/**
 * Creator: ACN
 * Date: 1.12.2016
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

  /**
   * Konstruktor
   */
  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Redirected dich zu /login, falls nicht eingeloggt.
   */
  ngOnInit() {
    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/chats');
    }
  }

}
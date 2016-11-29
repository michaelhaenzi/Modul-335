import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "./../../services/auth-service/auth.service";

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

  ngOnInit() {
    if(!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

}
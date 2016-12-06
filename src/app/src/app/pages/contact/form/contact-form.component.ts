import { Component, OnInit } from '@angular/core';
import {CustomHttpService} from "../../../services/custom-http-service/custom-http.service";
import {RestObject} from "../../../class/rest-object";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact-form',
  templateUrl: 'contact-form.component.html',
  styleUrls: ['contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  public firstname: string = localStorage.getItem("FIRSTNAME");
  public lastname: string = localStorage.getItem("LASTNAME");
  public phonenumber: string = localStorage.getItem("PHONENUMBER");
  public email: string = localStorage.getItem("EMAIL");
  public status: string = localStorage.getItem("STATUS");
  public profile_image: string = localStorage.getItem("FILEPATH");
  public file: string = null;

  constructor(private http: CustomHttpService, private router: Router) { }

  ngOnInit() {

  }

  public updateContact(): void {
    this.http.postItem("user", {firstname: this.firstname, lastname: this.lastname, email: this.email, phonenumber: this.phonenumber, status: this.status, file: this.file}).subscribe((res: RestObject) => {
      this.router.navigateByUrl("/settings");
    });
  }

  public changeImage($event): void {
    var input = $event.target;
    var file: File = input.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (ev: Event) => {
      this.file = myReader.result;
    }
    myReader.readAsDataURL(file);
  }

}

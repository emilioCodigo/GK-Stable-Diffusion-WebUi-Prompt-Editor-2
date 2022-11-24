import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { NgwWowService } from "ngx-wow";
import { filter } from "rxjs";
import * as AOS from "aos";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "porn-chat";
  constructor(private router: Router, private wow: NgwWowService) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(_ => {
      // this.wow.init();
      AOS.init();
    });
  }
}

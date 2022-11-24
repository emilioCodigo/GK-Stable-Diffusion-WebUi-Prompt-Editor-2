import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";
import { NgwWowModule } from "ngx-wow";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EditorV1Module } from "./pages/editor-v1/editor-v1.module";
import { WebsiteModule } from "./pages/website/website.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		NgwWowModule,
		RouterModule,
		ToastrModule.forRoot({ timeOut: 1000, maxOpened: 3 }),
		WebsiteModule,
		EditorV1Module,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

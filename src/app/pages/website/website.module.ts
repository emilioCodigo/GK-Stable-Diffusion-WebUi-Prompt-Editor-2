import { BACKPACK } from "./../../shared/util/backpack";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WebsiteComponent } from "./website.component";

@NgModule({
	declarations: [WebsiteComponent],
	imports: [CommonModule, BACKPACK.FuckModules],
})
export class WebsiteModule {}

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CommonCardComponent } from "./modules/common-card/common-card.component";
@NgModule({
	declarations: [CommonCardComponent],
	imports: [CommonModule],
	exports: [CommonCardComponent],
})
export class SharedModule {}

import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-common-card",
	templateUrl: "./common-card.component.html",
	styleUrls: ["./common-card.component.scss"],
})
export class CommonCardComponent implements OnInit {
	@Input() wrapperStyle = "";
	@Input() headerStyle = "";
	@Input() titleStyle = "";
	@Input() toolbarStyle = "";
	@Input() bodyStyle = "";
	@Input() cardTitle = "title";
	@Input() type: "normal" | "collapse" = "collapse";
	isCollapsed = false;
	constructor() {}
	ngOnInit(): void {}
}

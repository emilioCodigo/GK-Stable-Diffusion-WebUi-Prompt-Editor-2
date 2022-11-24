import { Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { iPrompt } from "src/app/shared/model/prompt.model";
import { EditorV1StatusService } from "../editor-v1-status.service";

@Component({
	selector: "app-block-detailed-editor",
	templateUrl: "./block-detailed-editor.component.html",
	styleUrls: ["./block-detailed-editor.component.scss"],
})
export class BlockDetailedEditorComponent implements OnInit, OnDestroy {
	list: iPrompt[] = [];
	sb: Subscription = new Subscription();
	// * * * * *  * * * * *
	constructor(private status: EditorV1StatusService) {
		this.list.push({ bracketWeight: 2, numWeight: 0, val: "[master]" });
		this.list.push({ bracketWeight: 0, numWeight: 0, val: "cry boy" });
		this.list.push({ bracketWeight: -1, numWeight: 0, val: "redux" });
		this.list.push({ bracketWeight: 0, numWeight: 1.2, val: "angular" });
		this.watch();
	}
	ngOnDestroy(): void {
		this.sb.unsubscribe();
	}
	ngOnInit(): void {}
	// * * * * *  * * * * *

	updateProp(item: iPrompt, val: number, type: "num" | "bracket") {
		let isPass = true;
		if (type === "bracket") {
			const nextVal = Number((item.bracketWeight + val).toFixed(1));
			item.numWeight = 0;
			item.bracketWeight = nextVal;
		}
		if (type === "num") {
			const nextVal = Number((item.numWeight + val).toFixed(1));
			item.bracketWeight = 0;
			item.numWeight = nextVal;
		}
		if (isPass) this.status.setList$(this.list);
	}
	updateName(item: iPrompt, val: string) {
		item.val = val;
		this.status.setList$(this.list);
	}
	getColor(num: number) {
		if (num === 0) return "text-light";
		if (num > 0) return "text-success";
		return "text-danger";
	}
	deleteItem(i: number) {
		this.list.splice(i, 1);
		this.status.setList$(this.list);
	}
	// * * * * *  * * * * *
	private watch() {
		const a1 = this.status.getList$().subscribe(res => {
			this.list = res;
		});
		this.sb.add(a1);
	}
}

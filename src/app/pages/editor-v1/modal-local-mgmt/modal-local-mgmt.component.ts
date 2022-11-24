import { ToastrService } from "ngx-toastr";
import { iPromptStore } from "./../../../shared/model/prompt.model";
import { EditorV1StatusService } from "./../editor-v1-status.service";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
	selector: "app-modal-local-mgmt",
	templateUrl: "./modal-local-mgmt.component.html",
	styleUrls: ["./modal-local-mgmt.component.scss"],
})
export class ModalLocalMgmtComponent implements OnInit {
	@ViewChild("nameIpt") nameIpt?: ElementRef;
	list: iPromptStore[] = [];
	idx = 0;
	constructor(private status: EditorV1StatusService, private toastr: ToastrService) {
		this.getLocal();
	}
	setLocal() {
		this.list.splice(0, 1);
		this.status.setLocal(this.list);
		this.getLocal();
	}
	getLocal() {
		const start: iPromptStore = { name: "當前", val: this.status.promptListToStr("zip") };
		this.list = [start, ...this.status.getLocal()];
		console.log(`getLocal...`, this.list);
	}
	save() {
		this.list[this.idx].name = this.nameIpt?.nativeElement.value || "";
		if (this.idx === 0) this.list.unshift(this.list[this.idx]);
		this.setLocal();
	}
	delete() {
		this.list.splice(this.idx, 1);
		this.setLocal();
	}
	changeSelected(i: number) {
		this.idx = i;
	}
	clickCopy() {
		this.toastr.success("已複製");
	}
	ngOnInit(): void {}
}

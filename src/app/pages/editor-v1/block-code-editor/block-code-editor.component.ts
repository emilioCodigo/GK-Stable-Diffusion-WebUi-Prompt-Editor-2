import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ModalLocalMgmtComponent } from "./../modal-local-mgmt/modal-local-mgmt.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditorV1StatusService } from "./../editor-v1-status.service";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { CodemirrorComponent } from "@ctrl/ngx-codemirror";

@Component({
	selector: "app-block-code-editor",
	templateUrl: "./block-code-editor.component.html",
	styleUrls: ["./block-code-editor.component.scss"],
})
export class BlockCodeEditorComponent implements OnInit, OnDestroy {
	@ViewChild("codeMirror") cm?: CodemirrorComponent;
	private sb = new Subscription();
	code: string = "masterpiece";
	// * * * * *  * * * * *
	constructor(
		private status: EditorV1StatusService,
		private modal: NgbModal,
		private toastr: ToastrService
	) {
		this.watch();
		this.cm?.options;
	}
	ngOnDestroy(): void {
		this.sb.unsubscribe();
	}
	ngOnInit(): void {}
	// * * * * *  * * * * *
	genPrompt() {
		this.status.strToPromptList(this.code);
		this.clickSplit();
	}
	clickSplit() {
		this.code = this.status.promptListToStr("split") || this.code;
	}
	clickZip() {
		this.code = this.status.promptListToStr("zip") || this.code;
	}
	openMGMTModal() {
		this.modal.open(ModalLocalMgmtComponent, { size: "xl", centered: true });
	}
	clickCopy() {
		this.toastr.success("已複製");
	}
	watch() {
		const a1 = this.status.getList$().subscribe(_ => {
			this.code = this.status.promptListToStr("split") || this.code;
		});
		this.sb.add(a1);
	}
}

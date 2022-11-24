import { BACKPACK } from "./../../shared/util/backpack";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditorV1Component } from "./editor-v1.component";
import { BlockCodeEditorComponent } from './block-code-editor/block-code-editor.component';
import { BlockDetailedEditorComponent } from './block-detailed-editor/block-detailed-editor.component';
import { ModalLocalMgmtComponent } from './modal-local-mgmt/modal-local-mgmt.component';

@NgModule({
	declarations: [EditorV1Component, BlockCodeEditorComponent, BlockDetailedEditorComponent, ModalLocalMgmtComponent],
	imports: [CommonModule, BACKPACK.FuckModules],
})
export class EditorV1Module {}

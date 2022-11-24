import { SharedModule } from "./../shared.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbCollapseModule, NgbModalModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { routeEnum } from "../enum/route.enum";
import { imgEnum } from "../enum/img.enum";
import { ClipboardModule } from "ngx-clipboard";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzSelectModule } from "ng-zorro-antd/select";
import { SwiperModule } from "swiper/angular";
import { NzRateModule } from "ng-zorro-antd/rate";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzAutocompleteModule } from "ng-zorro-antd/auto-complete";
import { CodemirrorModule } from "@ctrl/ngx-codemirror";
export class BACKPACK {
	static FuckModules = [
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HttpClientModule,
		//
		SharedModule,
		//
		NgbNavModule,
		NgbModalModule,
		NgbCollapseModule,
		SwiperModule,
		ClipboardModule,
		DragDropModule,
		//
		NzRadioModule,
		NzRateModule,
		NzTableModule,
		NzSelectModule,
		NzInputModule,
		NzButtonModule,
		NzAutocompleteModule,
		CodemirrorModule,
		//
	];
	static route = routeEnum;
	static img = imgEnum;
}

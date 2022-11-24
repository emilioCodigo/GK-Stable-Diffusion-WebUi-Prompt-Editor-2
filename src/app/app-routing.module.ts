import { EditorV1Component } from "./pages/editor-v1/editor-v1.component";
import { WebsiteComponent } from "./pages/website/website.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		component: WebsiteComponent,
		pathMatch: "full",
		children: [{ path: "", component: EditorV1Component }],
	},

	{ path: "**", redirectTo: "" },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular"
import { NativeScriptRouterModule } from "@nativescript/angular";

import { AppComponent } from "./app.component";
import { LayoutComponent } from './layout.component';
import { routes, navigatableComponents } from './app.routing';

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		NativeScriptModule,
		NativeScriptFormsModule,
		NativeScriptRouterModule,
		NativeScriptRouterModule.forRoot(routes),
	],
	declarations: [
		AppComponent,
		LayoutComponent,
		...navigatableComponents
	],
	exports: [
		LayoutComponent,
	],
	providers: [],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class AppModule { }

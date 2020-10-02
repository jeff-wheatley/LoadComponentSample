import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppComponent } from "./app.component";
import { SampleComponent } from './sample.component';

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		NativeScriptModule,
	],
	declarations: [
		AppComponent,
		SampleComponent,
	],
	exports: [
		SampleComponent,
	],
	providers: [],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class AppModule { }

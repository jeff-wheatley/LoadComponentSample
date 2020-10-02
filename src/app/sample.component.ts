import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// import { registerElement } from "nativescript-angular/element-registry";
import { ContentView } from '@nativescript/core/ui/content-view';

// registerElement('MultiSelect', () => ContentView);

@Component({
	moduleId: module.id,
	selector: 'sample',
	template: `<Label text="Sample Component"></Label>`})
export class SampleComponent extends ContentView implements OnInit {
	@Input() setting: number;
	constructor() { super() }

	ngOnInit() {
		console.log(`In sample ngOnInit with setting=${this.setting}`);
	}


}

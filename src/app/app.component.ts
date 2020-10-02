import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Label } from "tns-core-modules/ui/label";
import { Button } from "tns-core-modules/ui/button";
import { GridLayout, GridUnitType, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";

import { SampleComponent } from './sample.component';

@Component({
	moduleId: module.id,
	selector: 'ns-app',
	template: `
	<StackLayout>
		<TextField #textField text="button" hint="Type to add a component"
			keyboardType="url" autocorrect=false></TextField>
		<Button text="Add" (tap)="onTap()"></Button>
		<GridLayout #gridField columns="*, *" rows="auto">
			<label text="templated sample" row="0" col="0"></label>
			<sample setting="25" row="0" col="1"></sample>
		</GridLayout>
	</StackLayout>
`
})
export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild('gridField', {static: false}) gridField: ElementRef;
	@ViewChild('textField', {static: false}) textField: ElementRef;
	row: number;

	constructor() {}
	ngOnInit() {
		this.row = 2; 
	}
	ngAfterViewInit() {}


	onTap() {
		this.textField.nativeElement.dismissSoftInput();
		let name = this.textField.nativeElement.text.toLowerCase();
		var component: any;
		console.log(`Adding component ${name}`);
		switch( name ) {
			case 'sample':
				component = this.buildSample();
				break;
			case 'button':
				component = this.buildButton();
				break;
			default:
				console.error("User keyed in invalid response");
				return;
		}

		console.log("Adding component to grid");
		let grid: GridLayout = this.gridField.nativeElement;
		grid.addRow( new ItemSpec( 1, GridUnitType.AUTO ));
		let label = new Label();
		label.text = name;
		grid.addChild( label );
		GridLayout.setRow( label, this.row );
		grid.addChild( component );
		GridLayout.setRow( component, this.row );
		GridLayout.setColumn( component, 1 );
		this.row++
	}

	private buildButton(): Button {
		let button = new Button();
		button.text = `Button for row${this.row}`;
		return button;
	}

	private buildSample(): SampleComponent {
		let sample = new SampleComponent();
		sample.setting = 259;
		return sample;
	}

}


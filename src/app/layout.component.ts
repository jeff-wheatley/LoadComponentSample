import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import { Label } from "tns-core-modules/ui/label";
import { Button } from "tns-core-modules/ui/button";
import { TextField } from "tns-core-modules/ui/text-field";
import { GridLayout, GridUnitType, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { Visibility } from "tns-core-modules/ui/enums";

@Component({
	moduleId: module.id,
	selector: 'LayoutForm',
	template: `
		<StackLayout orientation="horizontal">
			<Button [text]="_submitLabel" (tap)="onTapSubmit($event)"></Button>
		</StackLayout>
	`
})
export class LayoutComponent implements OnInit {
	@Input() source: any; // source object being populated
	@Input() form: string; // id to GridLayout containing form elements
	@Input() submitLabel: string; // label to set on form submit button
	properties: Property[]; // list of property elements
	_form: GridLayout;
	_submitLabel: string = 'Save';

	@Output() submitTap = new EventEmitter<any>();

	constructor(
		private page: Page
	) {}

	ngOnInit() {
		// Get the form by the id provided by caller
		console.log("The specified form=" + this.form);
		const form: GridLayout = this.page.getViewById(this.form);
		this._form = form;

		// Allow the caller to override the default submitLabel
		if( this.submitLabel ) {
			this._submitLabel = this.submitLabel;
		}

		// Get the properties from the form and configure the views
		this.harvestPropertiesFromGrid();

		// Setting up validators is left as an exercise...
		// this.validationService.initialize( this.properties );
	}

	// If the form submit button is tapped, validate and send saveTap event or present errors
	onTapSubmit( event ) {
		console.log("in onTapSubmit");
		this.convertResults();
		if( this.validateForm() ) {
			console.log("form validated successfully, emitting saveTap event");
			this.submitTap.emit( event );
		}
		console.log("Completed onTapSave processing");
	}

	// Harvest the form elements as properties and configure the corresponding views
	// Populates this.properties
	private harvestPropertiesFromGrid() {
		this.properties = new Array(0);
		let childCount = this._form.getChildrenCount();
		console.log(`DataForm's grid has ${childCount} kids / properties`);

		for(let i=0; i < childCount; i++ ) {
		let child: any;
			child = this._form.getChildAt(i);
			let property = new Property( child ); //
			console.log(`child ${property.name}'s typeName=${child.typeName}, and type=${property.type}`);
			this.properties.push( property );
			this.configureProperty( property, i*2 );
		}
		console.log(`We harvested ${this.properties.length} elements`);
	}


	// Validate the properties of source object, setting element errors when found.
	// Return true if all elements are valid, false if any element fails validation.
	private validateForm(): boolean {
		let valid = true;
		for( let property of this.properties ) {
			let name = property.name;
		}
		return valid;
	}

	// Save converted form property values to the source object properties
	private convertResults() {
		for( let property of this.properties ) {
			switch( property.view.typeName ) {
				case 'TextField':
					this.source[property.name] = property.view.text;
					break;
				case 'ListPicker':
					this.source[property.name] = property.view.selectedValue;
					break;
				case 'datePicker':
					this.source[property.name] = property.view.date;
					break;
				default:
					console.error("Got unsupported type to convert " + property.type+ " for property " +property.name );
			}
		}
	}


	// Configure the specified property element based on its attributes
	private configureProperty( property: Property, row: number ) {
		let form = this._form;

		// Configure view with property on right, it's label on left, and error spanned below
		form.addRow( new ItemSpec( 1, GridUnitType.AUTO ) ); // row for property and it's label
		property.view.row = row;
		property.view.col = 1;
		property.label = new Label();
		property.label.text = property.labelText;
		form.addChildAtCell( property.label, row, 0 );
		form.addRow( new ItemSpec( 1, GridUnitType.AUTO ) ); // row for property's error
		property.error = new Label();
		// property.error.visibility = Visibility.collapse;
		form.addChildAtCell( property.error, row+1, 0, 1, 2 ); // error spans both columns of error row

		// Calculate the default value for the property to display
		let value = this.source[property.name];
		console.log("building property " + property.name + " with value =" + value );
		switch( property.type ) {
			case 'TextField':
				this.configureTextField(property, "url", false, true, value);
				break;
			case 'email':
				this.configureTextField( property, "email", false, false, value );
				break;
			case 'password':
				this.configureTextField( property, "email", true, false, value );
				break;
			case 'phone':
				this.configureTextField( property, "phone", false, false, value );
				break;
			case 'number':
			case 'decimal':
				this.configureTextField( property, "number", false, false, value );
				break;
			case 'ListPicker':
				this.configurePicker( property, value );
				break;
			case 'datePicker':
				this.configureDatePicker( property, value );
				break;
			default:
				console.error("DataForm does not support editor=" + property.type);
			return;
		}
	}

	// configure a Property for a text field
	private configureTextField( property: Property, keyboardType, secure, autocorrect, value ) {
		let text = <TextField>property.view;
		text.keyboardType = keyboardType;
		text.secure = secure;
		text.autocorrect = autocorrect;
		text.text = value ? value : null;
	}

	private configurePicker( property: Property, value ) {
		let picker: ListPicker = <ListPicker>property.view;
		picker.items = property.valList;
		picker.selectedIndex = 0;
	}

	// configure a Property of type DatePicker
	private configureDatePicker( property: Property, value ) {
		let picker: DatePicker = <DatePicker>property.view;
		// fix - default picker based on value
	}

}

// Represents a property element on the form, including the element, its label, error element and row position.
class Property {
	view: any; // the view of the property being displayed
	name: string; // binding name of the property on source
	type: string; // type of property
	labelText: string; // label text fore this property
	valList: any[]; // list of values for ListPicker
	label: any; // label element for property's view element
	error: any; // Label element which is hidden unless property has error

	constructor( view: any ) {
		this.view = view;
		this.name = view.property;
		this.type = view.type ? view.type : view.typeName;
		this.labelText = view.label ? view.label : view.property;
		this.valList = view.valList;
	}
}

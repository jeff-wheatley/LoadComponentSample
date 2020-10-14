import { Component, OnInit } from '@angular/core';

/**
This sample user component demonstrates the caller side of the approach.
- Essentially, we have a source object, and use LayoutComponent to get and validate User input.
- The properties are described in a GridLayout on the caller's template using supported elements decorated with metadata attributes.
- Note that element attributes are flexible; only when a element view is rendered do its required attributes need be set.
- We take advantage of this by adding extra attributes used by LayoutComponent, and by leaving off attributes for LayoutComponent to set.
- LayoutComponent presents the form with the properties in their defined order with a label to the left, the input field to the right, and a reserved error row below.
- LayoutComponent provides a submit button for User completion and which emits an submitTap to the caller.
- - The onSubmitTap handler will find the source object populated with User updates.
**/
@Component({
	moduleId: module.id,
	selector: 'parent',
	template: `
		<StackLayout height="500">
			<GridLayout id="MyForm" columns="*, *" height="300" width="200">
				<TextField property="email" type="email" required="true"></TextField>
				<TextField property="password" type="password" required="true"></TextField>
				<ListPicker property="choice" [valList]="choices" height="40"></ListPicker>
			</GridLayout>
			<LayoutForm [source]="myObject" form="MyForm" submitLabel="SaveForm" [submitTap]="onSubmitTap()"></LayoutForm>
	</StackLayout>
	`
		// NOTE the id="MyForm" and form="MyForm" references are how the GridLayout is found by LayoutComponent.
})
export class ParentComponent implements OnInit {
	choices = ['Apple', 'Banana', 'Orange', 'Grape'];
	myObject: any;

	constructor() {}
	ngOnInit() {
		this.myObject = {email: "myemail@gmail.com"}; // will default to User
	}

	onSubmitTap() {
		let obj = this.myObject;
		// User updates should be reflected
		console.log(`In onSubmit with: email/pw =${obj.email}/${obj.password} & choice=${obj.choice}`);
	}

}

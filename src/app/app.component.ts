import { Component } from '@angular/core';

// The top level <page-router-outlet> template is required to provide the page which is injected into LayoutComponent and used to get the form element view.LayoutComponent
@Component({
    selector: 'main',
    template: '<page-router-outlet></page-router-outlet>'
})
export class AppComponent { }

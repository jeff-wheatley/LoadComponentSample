import { ParentComponent } from './parent.component';

export const routes = [
	{ path: 'parent', component: ParentComponent },
	{ path: '', redirectTo: 'parent', pathMatch: 'full' },
];

export const navigatableComponents = [
	ParentComponent,
];

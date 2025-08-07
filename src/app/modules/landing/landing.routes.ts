import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './presentation/layout/layout.component';
import { LoginComponent } from './presentation/pages/login/login.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: '',
		component: LayoutComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LandingRoutes {}

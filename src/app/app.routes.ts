import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@core/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		loadChildren: () => import('./modules/landing/landing.module').then((m) => m.LandingModule),
	},
	{
		path: 'ecommerce',
		canActivate: [LoginGuard],
		loadChildren: () =>
			import('./modules/ecommerce/ecommerce.module').then((m) => m.EcommerceModule),
	},
	{
		path: '**',
		redirectTo: 'home',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}

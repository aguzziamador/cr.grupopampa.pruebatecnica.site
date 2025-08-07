import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './presentation/layout/layout.component';
import { InicioComponent } from './presentation/pages/inicio/inicio.component';
import { LoginGuard } from '@core/guards/login.guard';
import { ProductosComponent } from './presentation/pages/productos/productos.component';
import { CarritoComponent } from './presentation/pages/carrito/carrito.component';
/* import { ProductoComponent } from './presentation/components/product-modal/product-modal.component'; */

const routes: Routes = [
	{
		path: '',
		redirectTo: 'inicio',
		pathMatch: 'full',
	},
	{
		path: '',
		component: LayoutComponent,
		canActivateChild: [LoginGuard],
		data: { breadcrumb: 'ecommerce' },
		children: [
			{
				path: 'inicio',
				data: { breadcrumb: 'Inicio' },
				component: InicioComponent,
			},
			{
				path: 'carrito',
				data: { breadcrumb: 'Mi carrito' },
				component: CarritoComponent,
			},
			{
				path: 'productos/:categoria',
				data: { breadcrumb: 'Catalogo de productos' },
				component: ProductosComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EcommerceRoutes {}

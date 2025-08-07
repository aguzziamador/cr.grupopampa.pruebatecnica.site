import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceRoutes } from './ecommerce.routes';
import { LayoutComponent } from './presentation/layout/layout.component';
import { SidebarComponent } from './presentation/layout/sidebar/sidebar.component';
import { InicioComponent } from './presentation/pages/inicio/inicio.component';
import { BreadcrumbsComponent } from './presentation/layout/breadcrumbs/breadcrumbs.component';
import { GlobalComponentsModule } from 'src/app/shared/global-components.module';
import { FormsModule } from '@angular/forms';
import { ProductosComponent } from './presentation/pages/productos/productos.component';
import { ProductCardComponent } from './presentation/components/product-card/product-card.component';
import { CarritoComponent } from './presentation/pages/carrito/carrito.component';

@NgModule({
	declarations: [
		LayoutComponent,
		SidebarComponent,
		BreadcrumbsComponent,
		InicioComponent,
		ProductosComponent,
		ProductCardComponent,
		CarritoComponent,
	],
	imports: [GlobalComponentsModule, CommonModule, EcommerceRoutes, FormsModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EcommerceModule {}

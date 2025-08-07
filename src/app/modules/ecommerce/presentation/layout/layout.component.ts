import { Component } from '@angular/core';
import { SSService } from '@core/services/external/ss.service';

@Component({
	selector: 'app-layout',
	standalone: false,
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
})
export class LayoutComponent {
	constructor(public ssService: SSService) {}

	ContarCarrito() {
		return this.ssService.carrito
			.map((x) => x.quantity)
			.reduce((a, b) => {
				return a + b;
			}, 0);
	}
}

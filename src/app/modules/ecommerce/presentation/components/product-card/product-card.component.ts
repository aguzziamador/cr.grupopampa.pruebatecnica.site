import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SSService } from '@core/services/external/ss.service';
import { AlertService } from '@core/services/internal/alert.service';

@Component({
	selector: 'app-product-card',
	standalone: false,

	templateUrl: './product-card.component.html',
	styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
	@Input() product!: any;
	cantidad = 1;
	active = false;
	showModal = false;

	form = {
		title: 'Detalles del producto',
		actions: [
			{
				label: 'Cerrar',
				icon: 'times',
				action: () => {
					this.showModal = false;
				},
			},
		],
	};

	constructor(
		public router: Router,
		public ssService: SSService,
		private alertService: AlertService
	) {}

	ViewDetails() {
		this.showModal = true;
	}

	AddToCart() {
		if (this.active || this.showModal) {
			const product = this.ssService.carrito.find((x: any) => x.id == this.product.id);

			if (product) {
				product.quantity += this.cantidad;
			} else {
				this.product.quantity = this.cantidad;
				this.ssService.carrito.push(this.product);
			}
			this.ssService.GuardarCarrito();
			this.alertService.ShowToast('Se agregó al carrito');
			this.showModal = false;
			this.active = false;
			this.cantidad = 1;
		} else {
			this.active = true;
		}
	}

	Close() {
		this.active = false;
		this.cantidad = 1;
	}

	GetStars() {
		const fullStars = Math.floor(this.product.rating.rate);
		const hasHalf = this.product.rating.rate % 1 >= 0.5;
		const totalStars = 5;

		const stars = [];

		for (let i = 0; i < totalStars; i++) {
			if (i < fullStars) {
				stars.push('full');
			} else if (i === fullStars && hasHalf) {
				stars.push('half');
			} else {
				stars.push('empty');
			}
		}

		return stars;
	}
}

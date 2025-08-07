import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SSService } from '@core/services/external/ss.service';
import { AlertService } from '@core/services/internal/alert.service';
import { SesionService } from '@core/services/internal/sesion.service';

@Component({
	selector: 'app-carrito',
	standalone: false,

	templateUrl: './carrito.component.html',
	styleUrl: './carrito.component.scss',
})
export class CarritoComponent {
	tableColumns = [
		{ label: 'Articulo', name: 'title', class: 'text-start' },
		{ label: 'Cantidad', name: 'quantity', class: 'text-end' },
		{ label: 'Precio', name: 'price', class: 'text-end' },
	];
	tableFilters = {
		fields: [
			{
				customClass: 'col-12',
				type: 'text',
				name: 'Especialidad_Nombre',
				label: 'Nombre',
			},
		],
	};
	tableActions = [
		{
			tooltip: 'Eliminar',
			icon: 'trash',
			action: (item: any) => this.Eliminar(item),
		},
	];

	tableItems: any[] = [];

	form = {
		title: '',
	};

	comentario = '';

	constructor(
		public sesionService: SesionService,
		public ssService: SSService,
		public alertService: AlertService,
		public router: Router
	) {
		this.form.title = this.sesionService.sesion.nombre;
		this.tableItems = [...this.ssService.carrito];
	}

	Eliminar(item: any) {
		this.ssService.carrito.splice(
			this.ssService.carrito.findIndex((x: any) => x.id == item.id),
			1
		);
		this.ssService.GuardarCarrito();
		this.tableItems = [...this.ssService.carrito];
	}

	Guardar() {
		this.alertService
			.ShowYesNoQuestion('Confirmación', '¿Desea realizar este pedido?')
			.then((result) => {
				if (result.value) {
					this.ssService.showSpinner = true;
					this.ssService
						.GuardarPedido({
							comentario: this.comentario,
							detalles: this.ssService.carrito,
						})
						.subscribe((result) => {
							this.alertService.ShowToast('Pedido realizado exitosamente');
							this.ssService.carrito = [];
							this.ssService.GuardarCarrito();
							this.tableItems = [...this.ssService.carrito];
							this.comentario = '';
						})
						.add(() => {
							this.ssService.showSpinner = false;
						});
				}
			});
	}

	CalcularSubtotalTotal() {
		return this.ssService.carrito
			.map((x) => x.quantity * x.price)
			.reduce((a, b) => {
				return a + b;
			}, 0);
	}

	CalcularDescuentoTotal() {
		return this.ssService.carrito
			.map((x) => x.quantity * x.price * (x.discount / 100))
			.reduce((a, b) => {
				return a + b;
			}, 0);
	}

	CalcularTotalTotal() {
		return this.ssService.carrito
			.map((x) => x.quantity * x.price * (1 - x.discount / 100))
			.reduce((a, b) => {
				return a + b;
			}, 0);
	}
}

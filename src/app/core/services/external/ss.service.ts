import { Injectable } from '@angular/core';
import { EnviromentService } from '../internal/enviroment.service';
import { HttpClient } from '@angular/common/http';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SSService {
	public showSpinner = false;
	public showSidebar = true;

	public producto: any;
	public carrito: any[] = [];

	constructor(
		private enviromentService: EnviromentService,
		private http: HttpClient
	) {
		this.ValidarCarrito();
	}

	ValidarCarrito() {
		const storage = localStorage.getItem('carrito');

		if (!storage) {
			this.carrito = [];
			return;
		}

		this.carrito = JSON.parse(atob(storage));
	}

	GuardarCarrito() {
		localStorage.setItem('carrito', btoa(JSON.stringify(this.carrito)));
	}

	FormatCurrency(num: any) {
		return formatCurrency(num, 'en-US', getCurrencySymbol('', 'wide'), '', '1.0-0');
	}

	GuardarPedido(pedido: any) {
		const url: string = new URL(`Pedido`, this.enviromentService.urlApiGrupoPampaSecure).toString();
		return this.http.post(url, pedido).pipe(map((resp: any) => resp.data));
	}
}

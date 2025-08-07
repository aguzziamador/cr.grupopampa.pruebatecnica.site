import { Injectable } from '@angular/core';
import { EnviromentService } from '../internal/enviroment.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class FakeStoreService {
	constructor(
		private enviromentService: EnviromentService,
		private http: HttpClient
	) {}

	ListarProductos() {
		const url: string = new URL('products', this.enviromentService.urlApiFakeStore).toString();
		return this.http.get(url);
	}
}

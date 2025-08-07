import { Injectable } from '@angular/core';
import { EnviromentService } from '../internal/enviroment.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class WheatherService {
	private apiKey = '89e4b7773fea65758ea4c73c41e02ced';

	constructor(
		private enviromentService: EnviromentService,
		private http: HttpClient
	) {}

	ObtenerClimaActual(lat: number, lon: number) {
		const url = `${this.enviromentService.urlApiWheater}?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${this.apiKey}`;
		return this.http.get(url);
	}
}

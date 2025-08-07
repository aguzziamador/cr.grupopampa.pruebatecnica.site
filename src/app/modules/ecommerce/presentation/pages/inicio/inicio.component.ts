import { Component, OnInit } from '@angular/core';
import { WheatherService } from '@core/services/external/wheather.service';
import { AlertService } from '@core/services/internal/alert.service';

@Component({
	selector: 'app-inicio',
	standalone: false,

	templateUrl: './inicio.component.html',
	styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {
	weather: any;

	constructor(
		private weatherService: WheatherService,
		private alertService: AlertService
	) {}

	ngOnInit() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					this.weatherService.ObtenerClimaActual(latitude, longitude).subscribe({
						next: (data) => (this.weather = data),
						error: (err) => this.alertService.ShowToastError('No se pudo cargar el clima'),
					});
				},
				() => {
					this.alertService.ShowToastError('Permiso denegado o error al obtener ubicación');
				}
			);
		} else {
			this.alertService.ShowToastError('Geolocalización no soportada en este navegador');
		}
	}
}

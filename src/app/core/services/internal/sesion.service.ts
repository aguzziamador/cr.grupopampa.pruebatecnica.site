import { Injectable } from '@angular/core';
import { EnviromentService } from './enviroment.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SesionService {
	sesion: any = undefined;

	constructor(
		private enviromentService: EnviromentService,
		private router: Router,
		private http: HttpClient
	) {
		this.ValidateSesion();
	}

	ValidateSesion() {
		const storage = localStorage.getItem('storage');

		if (!storage) {
			this.sesion = undefined;
			return;
		}

		this.sesion = JSON.parse(atob(storage));
	}

	IniciarSesion(login: any) {
		const url: string = new URL(`login`, this.enviromentService.urlApiGrupoPampa).toString();
		return this.http.post(url, login).pipe(map((resp: any) => resp.data));
	}

	GuardarSesion(sesion: any) {
		this.sesion = {
			usuario_Id: sesion.usuario_Id,
			correo: sesion.correo,
			nombre: sesion.nombre,
			token: sesion.token,
		};

		localStorage.setItem('storage', btoa(JSON.stringify(this.sesion)));
	}

	CerrarSesion() {
		this.sesion = undefined;
		localStorage.removeItem('storage');
		this.router.navigate(['/home']);
	}
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@core/services/internal/alert.service';
import { SesionService } from '@core/services/internal/sesion.service';
import * as CryptoJS from 'crypto-js';

@Component({
	selector: 'app-login',
	standalone: false,

	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	/************************************************/
	//CONFIGURACIONES DE GUI
	/************************************************/
	enCurso = false;

	/************************************************/
	//NGMODELS
	/************************************************/
	usuario_Id = '';

	/************************************************/
	//INYECCION E INICIALIZACION
	/************************************************/
	constructor(
		private router: Router,
		private sesionService: SesionService,
		private alertService: AlertService
	) {
		this.sesionService.CerrarSesion();
	}

	IniciarSesion(form: any) {
		this.enCurso = true;

		const login = {
			Correo: form.value.username,
			Contrasena: this.getMD5(form.value.password),
		};

		this.sesionService
			.IniciarSesion(login)
			.subscribe((result) => {
				this.sesionService.GuardarSesion(result);
				this.router.navigate(['ecommerce']);
				this.alertService.ShowToast('Inicio de sesión exitoso');
			})
			.add(() => {
				this.enCurso = false;
			});
	}

	RestaurarPassword() {
		if (this.usuario_Id.trim() == '') {
			this.alertService.ShowInfo('Importante', 'Debe ingresar su usuario');
			return;
		}

		this.alertService
			.ShowYesNoQuestion('Confirmación', '¿Desea restaurar su contraseña?')
			.then((result) => {
				if (result.value) {
					this.alertService.ShowSuccess(
						'Restauración de contraseña',
						'Se ha enviado un correo con las instrucciones para restaurar su contraseña. (Funcionalidad pendiente de implementación — no disponible en el proyecto de ejemplo)'
					);
				}
			});
	}

	private getMD5(value: string): string {
		const hash: string = CryptoJS.MD5(value).toString();
		return hash;
	}
}

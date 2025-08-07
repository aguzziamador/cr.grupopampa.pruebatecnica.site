import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SesionService } from '@core/services/internal/sesion.service';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class HttpsInterceptor implements HttpInterceptor {
	constructor(private sesionService: SesionService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let reqAuth;

		if (this.sesionService.sesion != undefined) {
			const headers = new HttpHeaders({
				Authorization: `bearer ${this.sesionService.sesion.token}`,
			});
			reqAuth = req.clone({
				headers,
			});
		} else {
			reqAuth = req.clone();
		}

		return next.handle(reqAuth).pipe(catchError(this.showError));
	}

	showError(httpError: HttpErrorResponse) {
		const apiError = httpError.error;

		// Si es error por token, devuelve el usuario al login
		if (httpError.status === 401) {
			localStorage.removeItem('storage');
			window.location.href = '/home/login';
		}

		if (apiError && apiError.state == 1) {
			Swal.fire({
				title: '¡Importante!',
				text: apiError.message.replace('SHOW:', ''),
				icon: 'info',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Aceptar',
			});
		}

		if (apiError && apiError.state == -1) {
			Swal.fire({
				title: '¡Algo salió mal!',
				text: 'Por favor, vuelva a intentar, si el error persiste por favor contacte a soporte tecnico',
				icon: 'info',
				confirmButtonColor: '#d33',
				confirmButtonText: 'Aceptar',
			});
		}

		return throwError(httpError);
	}
}

import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { SesionService } from '@core/services/internal/sesion.service';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanActivateChild {
	constructor(
		private sesionService: SesionService,
		private router: Router
	) {}

	canActivate(): boolean {
		if (this.sesionService.sesion == undefined) {
			this.router.navigate(['/home']);
			return false;
		}
		return true;
	}

	canActivateChild(): boolean {
		return this.canActivate();
	}
}

import { Component } from '@angular/core';
import { SSService } from '@core/services/external/ss.service';
import { SesionService } from '@core/services/internal/sesion.service';

@Component({
	selector: 'app-sidebar',
	standalone: false,

	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
	menu: any = [];

	constructor(
		public sesionService: SesionService,
		public ssService: SSService
	) {
		this.menu = [
			{
				items: [{ Id: -1, label: 'Inicio', icon: 'heartbeat', route: 'inicio' }],
			},
			{
				title: 'Productos',
				items: [
					{ Id: 1, label: 'Todos', icon: 'tshirt', route: 'productos/all' },
					{ Id: 2, label: 'Joyería', icon: 'gem', route: 'productos/jewelery' },
					{ Id: 3, label: 'Electrónica', icon: 'tv', route: 'productos/electronics' },
					{ Id: 4, label: 'Ropa de Hombre', icon: 'male', route: "productos/men's clothing" },
					{ Id: 5, label: 'Ropa de Mujer', icon: 'female', route: "productos/women's clothing" },
				],
			},
		];
	}

	CerrarSesion() {
		this.sesionService.CerrarSesion();
	}

	Toggle() {
		this.ssService.showSidebar = false;
	}
}

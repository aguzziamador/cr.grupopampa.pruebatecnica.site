import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SSService } from '@core/services/external/ss.service';
import { filter } from 'rxjs';

@Component({
	selector: 'app-breadcrumbs',
	standalone: false,

	templateUrl: './breadcrumbs.component.html',
	styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent implements OnInit {
	breadcrumbs: { label: string; url: string }[] = [];
	pageTitle = '';

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private ssService: SSService
	) {}

	ngOnInit() {
		// Carga inicial de breadcrumbs
		this.updateBreadcrumbs();

		// Actualiza breadcrumbs en cada cambio de ruta
		this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
			this.updateBreadcrumbs();
		});
	}

	private updateBreadcrumbs() {
		this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
		this.pageTitle = this.breadcrumbs.length
			? this.breadcrumbs[this.breadcrumbs.length - 1].label
			: '';
	}

	private createBreadcrumbs(
		route: ActivatedRoute,
		url = '',
		breadcrumbs: { label: string; url: string }[] = []
	): { label: string; url: string }[] {
		const children: ActivatedRoute[] = route.children;

		if (children.length === 0) {
			return breadcrumbs;
		}

		for (const child of children) {
			const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
			if (routeURL !== '') {
				url += `/${routeURL}`;
			}

			const label = child.snapshot.data['breadcrumb'];
			if (label) {
				breadcrumbs.push({ label, url });
			}

			return this.createBreadcrumbs(child, url, breadcrumbs);
		}

		return breadcrumbs;
	}

	ToggleSideBar() {
		this.ssService.showSidebar = !this.ssService.showSidebar;
	}
}

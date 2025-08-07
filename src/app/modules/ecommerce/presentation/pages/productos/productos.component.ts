import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FakeStoreService } from '@core/services/external/fake-store.service';
import { SSService } from '@core/services/external/ss.service';
import { finalize, Subject, Subscription, switchMap, tap } from 'rxjs';

@Component({
	selector: 'app-productos',
	standalone: false,

	templateUrl: './productos.component.html',
	styleUrl: './productos.component.scss',
})
export class ProductosComponent implements OnDestroy {
	categoria = '';
	productos: any[] = [];

	form = {
		title: this.categoria,
		fields: [
			{
				customClass: 'col-12',
				type: 'text',
				name: 'nombre',
				label: 'Filtrar por nombre',
				onChange: () => {
					this.listarTrigger.next();
				},
			},
		],
	};
	formFilter = {
		nombre: '',
	};

	private listarTrigger = new Subject<void>();
	private subscription: Subscription;

	constructor(
		private route: ActivatedRoute,
		private fakeStoreService: FakeStoreService,
		private ssService: SSService
	) {
		this.subscription = this.listarTrigger
			.pipe(
				tap(() => {
					this.ssService.showSpinner = true;
				}),
				switchMap(() =>
					this.fakeStoreService.ListarProductos().pipe(
						finalize(() => {
							this.ssService.showSpinner = false;
						})
					)
				)
			)
			.subscribe((result: any) => {
				if (result) {
					let productosFiltrados = result.map((x: any) => ({
						...x,
						discount: 10,
						images: [
							{
								image: x.image,
							},
							{
								image:
									'https://uncorkmexico.com/wp-content/uploads/2024/10/Felline-Primitivo-Tarantino-I-Molini-Puglia.png.webp',
							},
							{
								image: 'https://vinoswagner.com/wp-content/uploads/bonanza-600x1800-2.png',
							},
							{
								image:
									'https://licoresfernandez.com/wp-content/uploads/2024/09/818838009825-460x460.png',
							},
						],
					}));

					if (this.categoria !== '') {
						productosFiltrados = productosFiltrados.filter(
							(p: any) => p.category === this.categoria
						);
					}

					if (this.formFilter.nombre !== '') {
						productosFiltrados = productosFiltrados.filter((p: any) =>
							p.title.toLowerCase().includes(this.formFilter.nombre.toLowerCase())
						);
					}

					this.productos = productosFiltrados;
				}
			});

		this.route.paramMap.subscribe((params) => {
			this.categoria = params.get('categoria') || '';
			if (this.categoria === 'all') {
				this.categoria = '';
				this.form.title = 'Todos nuestros productos';
			} else {
				this.form.title = 'Productos de la categoria: ' + this.categoria;
			}
			this.listarTrigger.next();
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

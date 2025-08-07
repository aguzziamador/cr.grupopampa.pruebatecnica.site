import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { createPopper, Instance } from '@popperjs/core';

import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';

@Component({
	selector: 'app-filter-text',
	standalone: false,

	templateUrl: './filter-text.component.html',
	styleUrl: './filter-text.component.scss',
})
export class FilterTextComponent implements AfterViewInit {
	@ViewChild('filter', { static: true }) filter!: ElementRef<HTMLButtonElement>;
	@ViewChild('modal', { static: true }) modal!: ElementRef<HTMLButtonElement>;
	private popperInstance!: Instance;

	value = '';
	valueFinal = '';

	ngAfterViewInit() {
		if (!this.filter) return;

		this.popperInstance = createPopper(this.filter.nativeElement, this.modal.nativeElement, {
			placement: 'right-start',
			modifiers: [
				{
					name: 'offset',
					options: { offset: [0, 8] },
				},
				preventOverflow,
				flip,
			],
		});
	}

	cerrarModal() {
		this.modal.nativeElement.classList.add('hidden');
	}

	abrirModal() {
		this.modal.nativeElement.classList.remove('hidden');
		this.popperInstance.update();
	}

	guardar() {
		this.valueFinal = this.value;
		this.cerrarModal();
	}

	borrar() {
		this.value = '';
		this.valueFinal = '';
		this.cerrarModal();
	}
}

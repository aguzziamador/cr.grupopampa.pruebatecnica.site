import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { createPopper, Instance } from '@popperjs/core';

import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
import flip from '@popperjs/core/lib/modifiers/flip.js';

@Component({
	selector: 'app-tooltip',
	standalone: false,
	templateUrl: './tooltip.component.html',
	styleUrl: './tooltip.component.scss',
})
export class TooltipComponent implements AfterViewInit {
	@ViewChild('tooltip', { static: true }) tooltip!: ElementRef<HTMLButtonElement>;
	@Input() target?: HTMLButtonElement;
	@Input() text = '';

	private popperInstance!: Instance;

	ngAfterViewInit() {
		if (!this.target) return;

		// Inicializa Popper.js
		this.popperInstance = createPopper(this.target, this.tooltip.nativeElement, {
			placement: 'bottom',
			modifiers: [
				{
					name: 'offset',
					options: { offset: [0, 8] },
				},
				preventOverflow,
				flip,
			],
		});

		// Escuchar eventos de hover
		this.target.addEventListener('mouseenter', () => this.showTooltip());
		this.target.addEventListener('mouseleave', () => this.hideTooltip());
	}

	showTooltip() {
		this.tooltip.nativeElement.classList.remove('hidden');
		this.popperInstance.update();
	}

	hideTooltip() {
		this.tooltip.nativeElement.classList.add('hidden');
	}
}

import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-button',
	standalone: false,
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
})
export class ButtonComponent {
	//------------------------------------------------------
	//PROPIEDADES
	//------------------------------------------------------
	@Input() type: 'button' | 'submit' | 'reset' = 'button';
	@Input() customClass = '';
	@Input() disabled = false;

	//------------------------------------------------------
	//DISPLAY
	//------------------------------------------------------
	@Input() tooltip = '';
	@Input() text = '';
	@Input() icon = '';

	//------------------------------------------------------
	//EVENTOS
	//------------------------------------------------------
	@Output() buttonClick = new EventEmitter<void>();
	@ViewChild('appButton', { static: true }) appButton!: ElementRef<HTMLButtonElement>;
}

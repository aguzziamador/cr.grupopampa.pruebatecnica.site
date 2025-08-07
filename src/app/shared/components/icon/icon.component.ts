import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-icon',
	standalone: false,
	templateUrl: './icon.component.html',
	styleUrl: './icon.component.scss',
})
export class IconComponent {
	@Input() icon = '';
	@Input() fixed = false;
}

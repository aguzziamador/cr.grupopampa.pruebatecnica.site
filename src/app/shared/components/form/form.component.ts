import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-form',
	standalone: false,
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FormComponent),
			multi: true,
		},
	],
})
export class FormComponent implements ControlValueAccessor {
	@Input() form: any;
	model: any = {};

	ngChange() {
		this.onChange(this.model);
	}

	ngBlur() {
		this.onTouched();
	}

	ngFocus() {
		this.onFocus();
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChange: (value: any) => void = () => {};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onTouched: () => void = () => {};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onFocus: () => void = () => {};

	writeValue(value: any): void {
		this.model = value || {};
	}

	registerOnChange(fn: (value: any) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	registerOnFocus(fn: () => void): void {
		this.onFocus = fn;
	}
}

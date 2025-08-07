import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-input-time',
	standalone: false,
	templateUrl: './input-time.component.html',
	styleUrl: './input-time.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputTimeComponent),
			multi: true,
		},
	],
})
export class InputTimeComponent implements ControlValueAccessor, OnInit {
	@Input() field = null;
	@Input() customClass = '';
	@Input() type: 'text' | 'time' = 'text';
	@Input() label = '';
	@Input() errorMessage = '';
	@Input() disabled = false;
	@Input() required = false;
	@Input() maxDate: string | null = null;
	@Input() minDate: string | null = null;

	model = '';

	ngOnInit() {
		if (this.field) {
			this.assignFieldValues(this.field);
		}
	}

	private assignFieldValues(field: any) {
		this.customClass = field.customClass ?? this.customClass;
		this.label = field.label ?? this.label;
		this.errorMessage = field.errorMessage ?? this.errorMessage;
		this.disabled = field.disabled ?? this.disabled;
		this.required = field.required ?? this.required;
		this.maxDate = field.maxDate ?? this.maxDate;
		this.minDate = field.minDate ?? this.minDate;
	}

	ngChange() {
		this.onChange(this.model);
	}

	ngBlur() {
		if (this.model == '') {
			this.type = 'text';
		}
		this.onTouched();
	}

	ngFocus() {
		this.type = 'time';
		this.onFocus();
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChange: (value: string) => void = () => { };

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onTouched: () => void = () => { };

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onFocus: () => void = () => { };

	writeValue(value: string): void {
		this.model = value || '';
	}

	registerOnChange(fn: (value: string) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	registerOnFocus(fn: () => void): void {
		this.onFocus = fn;
	}
}

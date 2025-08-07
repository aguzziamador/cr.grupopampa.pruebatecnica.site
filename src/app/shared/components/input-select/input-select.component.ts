import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-input-select',
	standalone: false,
	templateUrl: './input-select.component.html',
	styleUrl: './input-select.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputSelectComponent),
			multi: true,
		},
	],
})
export class InputSelectComponent implements ControlValueAccessor, OnInit {
	@Input() field = null;
	@Input() customClass = '';
	@Input() label = '';
	@Input() errorMessage = '';
	@Input() disabled = false;
	@Input() required = false;
	@Input() list = [];
	@Input() listKey = '';
	@Input() listValue = '';

	model = -1;

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
		this.list = field.list ?? this.list;
		this.listKey = field.listKey ?? this.listKey;
		this.listValue = field.listValue ?? this.listValue;
	}

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
		this.model = value || -1;
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

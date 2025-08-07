import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-input-text-area',
	standalone: false,
	templateUrl: './input-text-area.component.html',
	styleUrl: './input-text-area.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputTextAreaComponent),
			multi: true,
		},
	],
})
export class InputTextAreaComponent implements ControlValueAccessor, OnInit {
	@Input() field: any = null;
	@Input() customClass = '';
	@Input() type: 'text' | 'password' | 'email' | 'number' | 'tel' = 'text';
	@Input() label = '';
	@Input() errorMessage = '';
	@Input() disabled = false;
	@Input() required = false;
	@Input() max: number | null = null;
	@Input() min: number | null = null;
	@Input() pattern: string | RegExp = '.+';
	@Input() autoComplete = 'on';
	@Input() autoCapitalize = 'sentences';

	model = '';
	focus = false;

	ngOnInit() {
		if (this.field) {
			this.assignFieldValues(this.field);
		}
	}

	private assignFieldValues(field: any) {
		this.customClass = field.customClass ?? this.customClass;
		this.type = field.type ?? this.type;
		this.label = field.label ?? this.label;
		this.errorMessage = field.errorMessage ?? this.errorMessage;
		this.disabled = field.disabled ?? this.disabled;
		this.required = field.required ?? this.required;
		this.max = field.max ?? this.max;
		this.min = field.min ?? this.min;
		this.pattern = field.pattern ?? this.pattern;
		this.autoComplete = field.autoComplete ?? this.autoComplete;
		this.autoCapitalize = field.autoCapitalize ?? this.autoCapitalize;
		if (field.onTouched) {
			this.onTouchedField = field.onTouched;
		}
	}

	ngChange() {
		this.onChange(this.model);
	}

	ngBlur() {
		this.focus = false;
		this.onTouched();
		this.onTouchedField();
	}

	ngFocus() {
		this.focus = true;
		this.onFocus();
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChange: (value: string) => void = () => {};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onTouched: () => void = () => {};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onTouchedField: () => void = () => {};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onFocus: () => void = () => {};

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

import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-input-modal-select',
	standalone: false,
	templateUrl: './input-modal-select.component.html',
	styleUrl: './input-modal-select.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputModalSelectComponent),
			multi: true,
		},
	],
})
export class InputModalSelectComponent implements ControlValueAccessor, OnInit {
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
	modelView = -1;
	mostrarModal = false;

	tableColumns = [{ label: 'Nombre', name: 'Nombre', class: 'text-start' }];
	tableActions = [
		{
			tooltip: 'Seleccionar',
			icon: 'check',
			action: (item: any) => this.seleccionar(item),
		},
	];
	tableItems: any = [];

	filters = {
		fields: [
			{
				customClass: 'col-12',
				type: 'text',
				name: 'nombre',
				label: 'Nombre',
			},
		],
	};

	Filtrar(filter: any) {
		const normalize = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		this.tableItems = this.list
			.filter((x) =>
				normalize(x[this.listValue] as string)
					.toLowerCase()
					.includes(normalize(filter.nombre).toLowerCase())
			)
			.map((item) => {
				return {
					Id: item[this.listKey],
					Nombre: item[this.listValue],
				};
			});
	}

	ngOnInit() {
		if (this.field) {
			this.assignFieldValues(this.field);
		}
	}

	OpenModal() {
		if (!this.disabled) {
			this.mostrarModal = true;
			this.tableItems = this.list.map((item) => {
				return {
					Id: item[this.listKey],
					Nombre: item[this.listValue],
				};
			});
		}
	}

	Seleccionado() {
		return this.list.find((x: any) => x[this.listKey] == this.model)?.[this.listValue];
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
		if (field.onChange) {
			this.onChangeField = field.onChange;
		}
	}

	ngChange() {
		this.onChange(this.model);
		this.onChangeField();
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
	onChangeField: () => void = () => {};

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

	seleccionar(selected: any) {
		this.model = selected.Id;
		this.modelView = selected.Nombre;
		this.mostrarModal = false;
		this.ngChange();
	}
}

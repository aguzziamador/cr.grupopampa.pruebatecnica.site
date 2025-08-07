import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'currencyPipe',
	standalone: false,
})
export class CurrencyPipe implements PipeTransform {
	transform(value: number): string {
		return formatCurrency(value, 'en-US', getCurrencySymbol('', 'wide'), '', '1.2-2');
	}
}

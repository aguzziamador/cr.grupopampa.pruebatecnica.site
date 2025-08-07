import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { FormsModule } from '@angular/forms';
import { IconComponent } from './components/icon/icon.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { FilterTextComponent } from './components/filter-text/filter-text.component';
import { FormComponent } from './components/form/form.component';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { TableComponent } from './components/table/table.component';
import { CardComponent } from './components/card/card.component';
import { InputModalSelectComponent } from './components/input-modal-select/input-modal-selectcomponent';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { InputTextAreaComponent } from './components/input-text-area/input-text-area.component';
import { CurrencyPipe } from './pipes';

@NgModule({
	declarations: [
		ButtonComponent,
		TooltipComponent,
		InputTextAreaComponent,
		InputTextComponent,
		InputDateComponent,
		InputTimeComponent,
		InputSelectComponent,
		InputModalSelectComponent,
		IconComponent,
		TableComponent,
		FilterTextComponent,
		FormComponent,
		CardComponent,
		TableComponent,
		CurrencyPipe,
	],
	imports: [CommonModule, FontAwesomeModule, FormsModule],
	exports: [
		ButtonComponent,
		TooltipComponent,
		InputTextAreaComponent,
		InputTextComponent,
		InputDateComponent,
		InputTimeComponent,
		InputSelectComponent,
		InputModalSelectComponent,
		IconComponent,
		FilterTextComponent,
		FormComponent,
		CardComponent,
		TableComponent,
		CurrencyPipe,
	],
})
export class GlobalComponentsModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, far);
	}
}

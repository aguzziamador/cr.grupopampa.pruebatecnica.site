import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
	selector: 'app-table',
	standalone: false,

	templateUrl: './table.component.html',
	styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
	@Input() title: any = 'Listado';
	@Input() items: any = [];
	@Input() columns: any = [];
	@Input() filter: any = {};
	@Input() filters: any = [];
	@Input() actions: any = [];

	@Output() exportEvent = new EventEmitter<void>();
	@Output() addEvent = new EventEmitter<void>();
	@Output() refreshEvent = new EventEmitter<void>();
	@Output() closeEvent = new EventEmitter<void>();

	// Paginación
	@Input() pageSize = 25;
	currentPage = 1;
	totalPages = 1;
	paginatedItems: any[] = [];

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['items']) {
			this.calculateTotalPages();
			this.getPaginatedItems();
		}
	}

	calculateTotalPages(): void {
		this.totalPages = Math.ceil(this.items.length / this.pageSize);
	}

	getPaginatedItems(): void {
		const startIndex = (this.currentPage - 1) * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		this.paginatedItems = this.items.slice(startIndex, endIndex);
	}

	changePage(page: number): void {
		if (page >= 1 && page <= this.totalPages) {
			this.currentPage = page;
			this.getPaginatedItems();
		}
	}
}

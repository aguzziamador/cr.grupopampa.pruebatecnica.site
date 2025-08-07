import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	ShowYesNoQuestion(title: string, question: string): Promise<SweetAlertResult> {
		return Swal.fire({
			title: title,
			text: question,
			icon: 'question',
			showCancelButton: true,
			cancelButtonText: 'NO',
			cancelButtonColor: '#E53935',
			confirmButtonColor: '#7CB342',
			confirmButtonText: 'SI',
		});
	}

	ShowError(title: string, question: string) {
		Swal.fire({
			title: title,
			text: question,
			icon: 'error',
			confirmButtonColor: '#7CB342',
			confirmButtonText: 'Aceptar',
		});
	}

	ShowInfo(title: string, question: string) {
		Swal.fire({
			title: title,
			text: question,
			icon: 'info',
			confirmButtonColor: '#7CB342',
			confirmButtonText: 'Aceptar',
		});
	}

	ShowSuccess(title: string, question: string) {
		Swal.fire({
			title: title,
			text: question,
			icon: 'success',
			confirmButtonColor: '#7CB342',
			confirmButtonText: 'Aceptar',
		});
	}

	ShowToast(message: string) {
		Swal.fire({
			toast: true,
			icon: 'success',
			title: message,
			timer: 3000,
			position: 'top-end',
			showConfirmButton: false,
		});
	}

	ShowToastError(message: string) {
		Swal.fire({
			toast: true,
			icon: 'error',
			title: message,
			timer: 3000,
			position: 'top-end',
			showConfirmButton: false,
		});
	}
}

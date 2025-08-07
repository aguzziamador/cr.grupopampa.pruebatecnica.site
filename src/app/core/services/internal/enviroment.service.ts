/* eslint-disable security/detect-object-injection */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Injectable, Provider } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class EnviromentService {
	public version = '';
	public urlApiWheater = '';
	public urlApiFakeStore = '';
	public urlApiGrupoPampa = '';
	public urlApiGrupoPampaSecure = '';
	[key: string]: any;
}

export const EnviromentProvider: Provider = {
	provide: EnviromentService,
	useFactory: () => {
		const enviroment = new EnviromentService();

		const browserWindow = window || {};
		const browserWindowEnv = browserWindow['__env'] || {};

		for (const key in browserWindowEnv) {
			if (Object.prototype.hasOwnProperty.call(browserWindowEnv, key)) {
				enviroment[key] = window['__env'][key];
			}
		}

		return enviroment;
	},
	deps: [],
};

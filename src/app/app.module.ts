import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EnviromentProvider } from '@core/services/internal/enviroment.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpsInterceptor } from '@core/interceptors/https.interceptor';
import { SesionService } from '@core/services/internal/sesion.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
	providers: [
		EnviromentProvider,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpsInterceptor,
			multi: true,
			deps: [SesionService],
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

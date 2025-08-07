import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutes } from './landing.routes';
import { LayoutComponent } from './presentation/layout/layout.component';
import { GlobalComponentsModule } from 'src/app/shared/global-components.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './presentation/pages/login/login.component';

@NgModule({
	declarations: [LayoutComponent, LoginComponent],
	imports: [GlobalComponentsModule, CommonModule, LandingRoutes, FormsModule],
})
export class LandingModule {}

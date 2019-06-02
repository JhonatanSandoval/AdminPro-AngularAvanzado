import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings/settings.service';
import { SidebarService } from './shared/sidebar.service';
import { SharedService } from './shared/shared.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [SettingsService, SidebarService, SharedService]
})
export class ServiceModule {}

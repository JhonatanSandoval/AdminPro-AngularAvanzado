import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {}

  cambiarColor(color: string, link: any) {
    const curl = `/assets/css/colors/${color}.css`;
    this.document.getElementById('tema').setAttribute('href', curl);
    this.aplicarCheck(link);

    this.settingsService.ajustes.tema = color;
    this.settingsService.ajustes.temaUrl = curl;
  }

  aplicarCheck(link: any) {
    let selectores = document.getElementsByClassName('selector');
    for (let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }
}

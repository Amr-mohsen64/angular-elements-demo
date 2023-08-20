import { Component, Injector } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content!: string | SafeHtml;

  constructor(injector: Injector, domSanitizer: DomSanitizer) {
    const alertElement = createCustomElement(AlertComponent, {
      injector: injector,
    });
    customElements.define('amr-alert', alertElement);
    setTimeout(() => {
      this.content = domSanitizer.bypassSecurityTrustHtml(
        '<amr-alert message="renderd dianmically"></amr-alert>'
      );
    }, 2000);
  }
}

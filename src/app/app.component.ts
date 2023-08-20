import { Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  content: any = '';
  sanitizedHTML: any = '';

  constructor(private injector: Injector, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.initlizeCustomeElement();
  }

  updateSanitizedHTML() {
    this.sanitizedHTML = this.sanitizeHTML(this.content);
  }

  private sanitizeHTML(html: string): any {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

  initlizeCustomeElement() {
    const alertElement = createCustomElement(AlertComponent, {
      injector: this.injector,
    });
    customElements.define('amr-alert', alertElement);

    setTimeout(() => {
      this.sanitizedHTML = this.domSanitizer.bypassSecurityTrustHtml(
        '<amr-alert class="amr" message="renderd dianmically"></amr-alert>'
      );
    }, 2000);
  }
}

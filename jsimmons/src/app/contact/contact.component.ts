import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  email = 'jsim247@gmail.com';
  phone = '(903)-258-5884';
  phoneRaw = '+19032585884';
  copiedEmail = false;
  copiedPhone = false;

  copyToClipboard(text: string, type: 'email' | 'phone'): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        if (type === 'email') {
          this.copiedEmail = true;
          setTimeout(() => this.copiedEmail = false, 2500);
        } else {
          this.copiedPhone = true;
          setTimeout(() => this.copiedPhone = false, 2500);
        }
      });
    }
  }
}

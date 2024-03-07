import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appFormValidation]',
  standalone: true
})
export class FormValidationDirective {
  @Input() public validationMessages: Record<string, string>;

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('blur') onBlur() {
    this.showErrorMessage();
  }

  @HostListener('input') onInput() {
    this.showErrorMessage();
  }

  private showErrorMessage(): void {
    const control = this.control.control;
    if (control && control.invalid && control.touched) {
      this.removeErrorMessage();
      const errors = control.errors as ValidationErrors;
      const errorMessage = this.validationMessages[Object.keys(errors)[0]];
      const errorElement = document.createElement('div');
      errorElement.textContent = errorMessage;
      errorElement.className = 'error-message';
      this.el.nativeElement.parentElement.appendChild(errorElement);
    } else {
      this.removeErrorMessage();
    }
  }

  private removeErrorMessage() {
    const errorMessage = this.el.nativeElement.parentElement.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type buttunType = 'danger' | 'primary';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() public text: string;
  @Input() public isDisabled: boolean;
  @Input() public type: buttunType = 'primary';

  @Output() public clickEvent = new EventEmitter();

  public submit(): void {
    if (this.isDisabled) {
      return;
    }
    this.clickEvent.emit();
  }

}

import { Component, OnDestroy } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { Subscription } from 'rxjs';

import { ToastService } from '../../services/toast.service';
import { Toast } from '../../interfaces/toast.model';
import { ToastTypeEnum } from '../../enums/toast-type.enum';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnDestroy {
  public toast: Toast;
  public toastTypes = ToastTypeEnum;

  private subscription: Subscription;

  constructor(private toastService: ToastService) {
    this.subscription = this.toastService.getToast().subscribe(toast => {
      this.toast = toast;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

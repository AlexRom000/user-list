import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Toast } from '../interfaces/toast.model';
import { ToastTypeEnum } from '../enums/toast-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();

  public getToast(): Observable<Toast> {
    return this.toastSubject.asObservable();
  }

  public show(message: string, type: ToastTypeEnum): void {
    this.toastSubject.next({ message, type });
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  private hide(): void {
    this.toastSubject.next(null);
  }
}

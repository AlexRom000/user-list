import { Component, inject } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { User } from '../../interfaces/user.model';
import { UserFormService } from '../../services/user-form.service';
import { UserListComponent } from '../user-list/user-list.component';
import { ButtonComponent } from '../button/button.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, NgIf, UserListComponent, ButtonComponent, UserFormComponent, ToastComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public isShowedForm = false;
  public selectedUser: User;

  private userFormService = inject(UserFormService);

  public openForm(user?: User): void {
    this.isShowedForm = true;
    this.selectedUser = user as User;
    this.userFormService.createForm(user);
    this.userFormService.recognizeMode(user);
  }

  public closeForm(): void {
    this.userFormService.resetForm();
    this.isShowedForm = false;
  }
}

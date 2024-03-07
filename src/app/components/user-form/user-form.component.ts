import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../interfaces/user.model';
import { UserFormService } from '../../services/user-form.service';
import { UserService } from '../../services/user.service';
import { ButtonComponent } from '../button/button.component';
import { UserType } from '../../enums/user-type.enum';
import { FormValidationDirective } from '../../directives/form-validation.directive';
import { UserFormControlModel } from '../../interfaces/user-form.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, FormsModule, ButtonComponent, FormValidationDirective],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges {
  @Input() public user: User;
  @Output() public closeEvent = new EventEmitter<void>();

  public form: FormGroup<UserFormControlModel>;
  public isAddMode: boolean;
  public isEditMode: boolean;
  public userTypes = Object.values(UserType).map((value) => value);;

  private userFormService = inject(UserFormService);
  private userService = inject(UserService);

  public ngOnChanges(): void {
    this.form = this.userFormService.getForm();
    this.isAddMode = this.userFormService.isAddMode;
    this.isEditMode = this.userFormService.isEditMode;
  }

  public deleteUser(): void {
    this.userService.deleteUser(this.user.id);
    this.closeEvent.emit()
  }

  public editUser(): void {
    if (this.form.valid) {
      this.userService.editUser(this.user.id, this.form.getRawValue());
      this.closeEvent.emit();
    }
  }

  public createUser(): void {
    if (this.form.valid) {
      this.userService.addUser(this.form.getRawValue());
      this.closeEvent.emit();
    }
  }
}

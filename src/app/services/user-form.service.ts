import { Injectable, inject } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

import { User } from "../interfaces/user.model";
import { UserFormControlModel } from "../interfaces/user-form.model";

@Injectable({
    providedIn: 'root'
})
export class UserFormService {
    public isEditMode: boolean;
    public isAddMode: boolean;

    private fb = inject(FormBuilder);
    private form: FormGroup<UserFormControlModel>;
    private users: User[];

    public createForm(user?: User): void {
        const numberAndLetter = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
        this.form = this.fb.nonNullable.group({
            userName: [user?.userName || null, []],
            firstName: [user?.firstName || null, [Validators.required]],
            lastName: [user?.lastName || null, [Validators.required]],
            email: [user?.email || null, [Validators.required, Validators.email]],
            type: [user?.userType || null, [Validators.required]],
            password: [user?.password || null, [Validators.required, Validators.minLength(8), Validators.pattern(numberAndLetter)]],
            repeatPassword: [user?.password || null, []],
        });

        this.form.controls['userName'].setValidators([Validators.required, this.uniqueUserNameValidator.bind(this)])
        this.form.controls['repeatPassword'].setValidators([Validators.required, this.passwordMatchValidator.bind(this)])
    }

    public resetForm(): void {
        this.form.reset();
    }

    public getForm(): FormGroup<UserFormControlModel> {
        return this.form;
    }

    public recognizeMode(user?: User): void {
    if (user) {
      this.isEditMode = true;
      this.isAddMode = false;
    } else {
      this.isEditMode = false;
      this.isAddMode = true;
    }
  }

  public setUsers(users: User[]): void {
    this.users = users
  }

  private uniqueUserNameValidator(control: AbstractControl): ValidationErrors {
    const userNames = this.users.map(user => user.userName);
    const isMatch = userNames.includes(control.value)

    return isMatch ? { unique: true } : null;
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors {
    const password = this.form.controls['password'].value;
    const confirmPassword = control.value;

    return password === confirmPassword ? null : { mismatch: true };
  }
}
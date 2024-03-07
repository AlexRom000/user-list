import { FormControl } from "@angular/forms";
import { UserType } from "../enums/user-type.enum";

export interface UserFormControlModel {
    userName: FormControl<string>,
    firstName: FormControl<string>,
    lastName: FormControl<string>,
    email: FormControl<string>,
    type: FormControl<UserType>,
    password: FormControl<string>,
    repeatPassword: FormControl<string>,
}

export interface UserFormModel {
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    type: UserType,
    password: string,
    repeatPassword: string,
}
import { Injectable, inject } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

import { User } from "../interfaces/user.model";
import { UserType } from "../enums/user-type.enum";
import { ToastService } from "./toast.service";
import { ToastTypeEnum } from "../enums/toast-type.enum";
import { UserFormModel } from "../interfaces/user-form.model";

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private mockUsers: User[] = [
        {
            id: 1,
            userName: 'mperry1969',
            firstName: 'Matthew',
            lastName: 'Perry',
            email: 'matthew.perry@mail.com',
            password: 'qwerty123',
            userType: UserType.Admin,
        },
        {
            id: 2,
            userName: 'janiston1969',
            firstName: 'Jennifer',
            lastName: 'Aniston',
            email: 'jennifer.aniston@mail.com',
            password: 'qwerty123',
            userType: UserType.Admin,
        },
        {
            id: 3,
            userName: 'ccox1964',
            firstName: 'Courteney',
            lastName: 'Cox',
            email: 'Courteney.cox@mail.com',
            password: 'qwerty123',
            userType: UserType.Admin,
        },
        {
            id: 4,
            userName: 'lkudrow1963',
            firstName: 'Lisa',
            lastName: 'Kudrow',
            email: 'lisa.kudrow@mail.com',
            password: 'qwerty123',
            userType: UserType.Driver,
        },
        {
            id: 5,
            userName: 'mLeBlanc1967',
            firstName: 'Matthew',
            lastName: 'LeBlanc',
            email: 'matthew.leBlanc@mail.com',
            password: 'qwerty123',
            userType: UserType.Admin,
        },
        {
            id: 6,
            userName: 'dschwimmer1966',
            firstName: 'David',
            lastName: 'Schwimmer',
            email: 'david.schwimmer@mail.com',
            password: 'qwerty123',
            userType: UserType.Driver,
        },
    ]
    private toastService = inject(ToastService);
    private users$ = new BehaviorSubject<User[]>(this.mockUsers);

    public getUsers(): Observable<User[]> {
        return this.users$.asObservable();
    }

    public addUser(form: UserFormModel): void {
        const candidate: User = {
            email: form.email,
            firstName: form.firstName,
            id: this.mockUsers.length + 1,
            lastName: form.lastName,
            password: form.password,
            userName: form.userName,
            userType: form.type,
        }
        this.mockUsers.unshift(candidate);
        this.users$.next(this.mockUsers);
        this.toastService.show('New user was successfully added to list.', ToastTypeEnum.SUCCESS);
    }

    public editUser(userId: number, form: UserFormModel): void {
        const userIndex = this.mockUsers.findIndex((item: User) => item.id === userId);
        this.mockUsers[userIndex] = {
            email: form.email,
            firstName: form.firstName,
            id: this.mockUsers[userIndex].id,
            lastName: form.lastName,
            password: form.password,
            userName: form.userName,
            userType: form.type
        };
        this.users$.next(this.mockUsers);
        this.toastService.show('User was successfully edited.', ToastTypeEnum.SUCCESS);
    }

    public deleteUser(userId: number): void {
        this.mockUsers = this.mockUsers.filter((user: User) => user.id !== userId);
        this.users$.next(this.mockUsers);
        this.toastService.show('User was successfully deleted.', ToastTypeEnum.SUCCESS);
    }
}
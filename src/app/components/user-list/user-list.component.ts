import { Component, DestroyRef, OnInit, inject, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgFor } from '@angular/common';

import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.model';
import { UserFormService } from '../../services/user-form.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  @Output() public openEdit = new EventEmitter<User>();

  private userService = inject(UserService);
  private userFormService = inject(UserFormService);
  private destroyRef = inject(DestroyRef);

  public users: User[] = [];

  public ngOnInit(): void {
    this.userService.getUsers().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((users: User[]) => {
      this.users = users;
      this.userFormService.setUsers(users)
    })
  }
}

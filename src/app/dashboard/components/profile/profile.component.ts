import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {currentUserSelector, loggedInUserSelector} from "../../../auth/state/auth.selectors";
import {CurrentUserInterface} from "../../../shared/types/currentUser.interface";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {updateUserAction} from "../../../auth/state/auth.actions";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: CurrentUserInterface | null | undefined;
  updateProfileForm = this.fb.group({
    first_name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    last_name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],
    phone_number: ['', [
      Validators.required,
      Validators.maxLength(13),
      Validators.minLength(10),
    ]],
  })

  constructor(
    private store: Store,
    private fb: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initializeValues()
    this.patchValue()
  }

  get f() {
    return this.updateProfileForm.controls;
  }

  patchValue() {
    let update = {
      first_name: this.currentUser?.first_name,
      last_name: this.currentUser?.last_name,
      phone_number: this.currentUser?.phone_number
    }
    this.updateProfileForm.patchValue(update);
  }

  initializeValues(): void {
    this.store.pipe(select(loggedInUserSelector)).subscribe({
      next: (user => {
        this.currentUser = user
      }),
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateProfile() {
    const userData = {
      ...this.updateProfileForm.value,
      id: this.currentUser?.id
    }
    this.store.dispatch(updateUserAction({updateUser: userData}));
  }

}

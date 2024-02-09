import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";

import {loginAction, signUpAction} from "../../state/auth.actions";
import {isSubmittingSelector} from "../../state/auth.selectors";
import {UserTypesEnum} from "../../types/userModel";
import {ConfirmedValidator} from "./confirmed.validator";
import { AuthService } from '../../service/auth.service';
import {NotificationService} from "../../../shared/service/notification.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  isFarmerSelected = false;
  isGovtSelected = false;
  isLoginSelected = false;
  isOption = '';
  showSignUp = false;
  headerMsg = 'Log In';
  isSubmitting$: Observable<boolean> | undefined;
  submitted = false;
  showPassword = false;
  showConfirmPassword = false;
  userPhoneNumber: any;
  optToken: any;

  ///// Signup Form
  signUpForm = this.fb.group({
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
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern('^[0-9]+$'),
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]],
    user_type_id: ['', Validators.required],
    password: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]],
    confirm_password: ['', [Validators.required]],
  }, {
    validator: ConfirmedValidator('password', 'confirm_password')
  });

  ///// Login Form
  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]],
  });

  //// Otp Form
  enterOtpForm = this.fb.group({
    otp: ['', Validators.required],
  })


  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private authService: AuthService,
    private toast: NotificationService,

  ) {
  }

  ngOnInit(): void {
    this.initializeValues();
  }

  toggleShowPwd() {
    this.showPassword = !this.showPassword;
  }

  toggleShowCPwd() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  get f() {
    return this.signUpForm.controls;
  }

  get fl() {
    return this.loginForm.controls;
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  //////////////**Activate the different Sections**///////////////
  onSwitch() {
    this.isLoginSelected = !this.isLoginSelected;
    this.headerMsg = this.isLoginSelected ? 'Sign Up' : 'Log In';
  }

  isLoginType(type: string) {
    this.showSignUp = true;
    if (type == 'farmer') {
      this.signUpForm.patchValue({
        user_type_id: UserTypesEnum.FARMER,
      });
      this.isFarmerSelected = true;
      this.isGovtSelected = false;
    } else {
      this.signUpForm.patchValue({
        user_type_id: UserTypesEnum.AGRIGATOR,
      });
      this.isFarmerSelected = false;
      this.isGovtSelected = true;
    }
  }

  optionSelected(option: string) {
    this.isOption = option == 'farmer' ? 'farmer' : 'govt';
  }

  //////////////////////**Signup and Login**//////////////////////
  signUpUser() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value)

      this.store.dispatch(signUpAction({signup: this.signUpForm.value}))
      this.isLoginSelected = !this.isLoginSelected
    }
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.store.dispatch(loginAction({login: this.loginForm.value}));
    }
  }

  enterOtp() {
    const phoneNumber = this.userPhoneNumber;
    this.authService.verifyOTP(phoneNumber, this.optToken).subscribe({
      next: (res) => {
        const loginInfo = {
          email: this.signUpForm.value.email,
          password: this.signUpForm.value.password,
        }
        this.store.dispatch(loginAction({login: loginInfo}));
      },
      error: (err) => {
        this.toast.showNotification(`There was a problem logging you in, Kindly Enter  OTP again`, 'error' );

      }
    })
  }

  resendOtp() {
    const phoneNumber = this.userPhoneNumber;
    const first = phoneNumber[0];
    const phoneNumber2 = phoneNumber.replace(first, '+' + 254);

    this.authService.getOTP(phoneNumber2).subscribe({
      next: (res) => {
        this.toast.showNotification(`OPT has been resent to your number, Kindly enter it below`, 'success' );
      },
      error: (err) => {
        this.toast.showNotification(`There was a problem resending your OPT, Kindly try again`, 'error' );
        console.log('the err', err)
      }
    })
  }
}

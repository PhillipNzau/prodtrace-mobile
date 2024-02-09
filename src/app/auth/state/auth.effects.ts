import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AuthService} from "../service/auth.service";
import {
  loginAction,
  loginFail,
  loginSuccess,
  logOutAction,
  logOutActionFail,
  logOutActionSuccess,
  refreshTokenAction,
  refreshTokenActionFail,
  refreshTokenActionSuccess,
  signUpAction,
  signUpFail,
  signUpSuccess, updateUserAction, updateUserActionFail, updateUserActionSuccess
} from "./auth.actions";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {
  LoginUserInterface,
  RefreshTokenFailInterface,
  RefreshTokenInterface,
  SignUpUserInterface,
  UserModelInterface
} from "../types/userModel";
import {Action} from "@ngrx/store";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../../shared/service/notification.service";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {LocalService} from "../../shared/service/local.service";

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private route: Router,
    private toast: NotificationService,
    private localStore: LocalService
  ) {
  }

  // Check if response is valid and state data to localstorage
  checkResValidity(res: UserModelInterface) {
    if (res != null) {
      const resData = res;
      this.route.navigateByUrl('/').then(r => {
      });

      if (resData.token != null) {
        localStorage.setItem('token', resData.token.access);
        localStorage.setItem('refresh', resData.token.refresh);
        localStorage.setItem('lifetime', resData.token.lifetime);
        localStorage.setItem('exTime', resData.token.expiry_time);
      }
    }
  }

  checkRefreshResValidity(res: RefreshTokenInterface) {
    if (res != null) {
      const resData = res;
      this.route.navigateByUrl('/').then(r => {
      });

      if (resData != null) {
        localStorage.setItem('token', resData.access);
        localStorage.setItem('refresh', resData.refresh);
      }
    }
  }

  //////////////////**Login / Signup Effects**/////////////////////

  loginUser$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(loginAction),
      map(({login}) => login),
      switchMap((login: LoginUserInterface) => {
        return this.authService.proceedLogin(login).pipe(
          map((currentUser: UserModelInterface) => {
            this.checkResValidity(currentUser);
            this.toast.showNotification(`Welcome ${currentUser.user.get_full_name}`, 'success' );
            return loginSuccess({user: currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('Error', errorResponse.error)
            const err =  errorResponse.error
            this.toast.showNotification(`Mmmm something went wrong: ${err[Object.keys(err)[0]]}`, 'error');
            return of(loginFail({err: errorResponse.error}))
          })
        );
      })
    )
  );

  signUpUser$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(signUpAction),
      map(({signup}) => signup),
      switchMap((signup: SignUpUserInterface) => {
        return this.authService.proceedSignUp(signup).pipe(
          map((currentUser: UserModelInterface) => {
            this.checkResValidity(currentUser);
            this.toast.showNotification(`Created account successfully, Enter OTP to continue `, 'success' );

            return signUpSuccess({user: currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('Error', errorResponse)
            const err =  errorResponse.error
            this.toast.showNotification(`Mmmm something went wrong: ${err[Object.keys(err)[0]]}`, 'error');
            return of(signUpFail({err: errorResponse.error}))
          })
        );
      })
    )
  );

  logoutUser$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(logOutAction),
      map(({msg}) => msg),
      switchMap((msg: string) => {
        return this.authService.proceedLogout(msg).pipe(
          map((msg: string) => {
            localStorage.clear();
            this.route.navigateByUrl('/auth').then(r => {
            });
            this.toast.showNotification(`Come back soon`, 'success' );

            return logOutActionSuccess({msg})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('Error', errorResponse.status)
            if (errorResponse.status == 400) {
              localStorage.clear();
              this.toast.showNotification(`Error logging you out`, 'error');

              this.route.navigateByUrl('/auth').then(r => {
              });
            }
            // this.toast.showNotification(`Mmmm something went wrong: ${ errorResponse.error}`, 'error');

            return of(logOutActionFail({msg: errorResponse.error}))
          })
        );
      })
    )
  );

  refreshToken$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(refreshTokenAction),
      map(({refresh}) => refresh),
      switchMap((refresh: string) => {
        return this.authService.proceedGenRefreshToken(refresh).pipe(
          map((currentUser: RefreshTokenInterface) => {
            console.log(currentUser)
            this.checkRefreshResValidity(currentUser);
            return refreshTokenActionSuccess({refresh: currentUser})
          }),
          catchError((err: RefreshTokenFailInterface) => {
            console.log('Error', err.detail)
            return of(refreshTokenActionFail({refresh: err}))
          })
        );
      })
    )
  );

  updateProfileUser$: Observable<Action> = createEffect(
    () => this.actions$.pipe(
      ofType(updateUserAction),
      map(({updateUser}) => updateUser),
      switchMap((userData: CurrentUserInterface) => {
        return this.authService.updateUser(userData).pipe(
          map((userData:CurrentUserInterface) => {
            // this.toast.showNotification(`Profile updated Successfully`, 'success' );
            this.route.navigateByUrl('').then(r => {
            });
            this.toast.showNotification('Profile Updated successfully', 'success');

            return updateUserActionSuccess({updateUser: userData})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('Error', errorResponse.error?.phone_number[0]);
            this.toast.showNotification(`Phone number already exists`, 'error');

            return of(updateUserActionFail({error: errorResponse.error}))
          })
        );
      })
    )
  );
  //////////////////////////////////////////////////////////
}

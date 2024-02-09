import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginUserInterface, RefreshTokenInterface, SignUpUserInterface, UserModelInterface} from "../types/userModel";
import {environment} from "../../../environments/environment";

import {map, Observable, tap} from "rxjs";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";
import {LocalService} from "../../shared/service/local.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl = environment.loginUser;
  signUpUrl = environment.registerUser;
  logOutUrl = environment.logOutUser;
  refreshTokenUrl = environment.tokenRefresh;
  updateUserUrl = environment.updateUser;
  otpUrl = environment.getOtp;
  verifyOtpUrl = environment.verifyOtp;
  private refreshTokenInProgress = false;

  constructor(
    private http: HttpClient,
    private localStore: LocalService) {
  }

  //// Refresh the token
  refreshToken():any {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;
      // Make a request to the refresh token endpoint
      return this.http.post<any>(this.refreshTokenUrl, {refresh: localStorage.getItem('refresh')})
        .pipe(
          tap(tokens => {
            // Update the stored access and refresh tokens
            localStorage.setItem('token', tokens.access);
            localStorage.setItem('refresh', tokens.refresh);

            // Reset the refresh token in progress flag
            this.refreshTokenInProgress = false;
          })
        );
    }
  }

  //// Schedule the token refresh
  scheduleRefreshToken() {
    setTimeout(() => {
      console.log('This is running')
      this.refreshToken().subscribe();
    }, 90 * 60 * 1000); // 1.5hrs
  }


  // Check login status for auth guard
  isLoggedIn() {
    return localStorage.getItem('token') != null;
  };

  //////////////////**Login / Signup**/////////////////////
  proceedSignUp(userData: SignUpUserInterface): Observable<UserModelInterface> {
    return this.http.post<UserModelInterface>(this.signUpUrl, userData).pipe(
      map((response: UserModelInterface) => response)
    )
  };

  proceedLogin(userData: LoginUserInterface): Observable<UserModelInterface> {
    return this.http.post<UserModelInterface>(this.loginUrl, userData)
      .pipe(
        map((response:UserModelInterface) => response))
  };

  proceedLogout(refresh: string): Observable<string> {
    return this.http.post<string>(this.logOutUrl, {refresh_token: refresh})
      .pipe(map((response: string)=> response))
  };

  proceedGenRefreshToken(refresh: string): Observable<RefreshTokenInterface> {
    return this.http.post<RefreshTokenInterface>(this.refreshTokenUrl, {refresh: refresh})
      .pipe(map((response: RefreshTokenInterface) => response));
  }

  updateUser(userData: CurrentUserInterface): Observable<CurrentUserInterface> {
    console.log('Service', userData)
    return this.http.put<CurrentUserInterface>(this.updateUserUrl + userData.id,userData).pipe(
      map((response: CurrentUserInterface) => response)
    )
  };

  getOTP(phoneNumber: string): Observable<any> {
    return this.http.post<any>(this.otpUrl, {phone: phoneNumber})
  }

  verifyOTP(phoneNumber: string, otpToken: number): Observable<any> {
    return this.http.post<any>(this.verifyOtpUrl, {phone: phoneNumber, token: otpToken})
  }

  //////////////////////////////////////////////////////////

  ///////////////////**Token functions**////////////////////
  GetToken() {
    return localStorage.getItem('token') || '';
  };

  GetExpTime() {
    return localStorage.getItem('exTime') || '';
  }


  // Check user role for role guard
  HaveAccess() {
    let loginToken = this.GetToken();
    let _extractedToken = loginToken.split('.')[1];
    let _atobData = window.atob(_extractedToken);
    let _finalData = JSON.parse(_atobData);
    // if (_finalData.role == 'farmer') {
    //   return true
    // }
    // console.log('User Role', _finalData)
  };
  //////////////////////////////////////////////////////////
}





// proceedSignUp(userData: SignUpUserInterface) {
//   return this.http.post<UserModelInterface>(this.signUpUrl, userData).subscribe({
//     next: (res: UserModelInterface) => {
//       this.checkResValidity(res);
//     },
//     error: (err: any) => {
//       console.log(err)
//     }
//   });
// }
// proceedLogin(userData: LoginUserInterface) {
//   return this.http.post<UserModelInterface>(this.loginUrl, userData).subscribe({
//     next: (res: UserModelInterface) => {
//       this.checkResValidity(res);
//     },
//     error: (err: any) => {
//       console.log(err)
//     }
//   });
// }

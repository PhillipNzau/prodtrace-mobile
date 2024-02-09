import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../../auth/service/auth.service";
import {Store} from "@ngrx/store";
import {logOutAction, refreshTokenAction} from "../../auth/state/auth.actions";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  refresh = localStorage.getItem('refresh') || '';
  constructor(private authService: AuthService,
              private route: Router,
              private store: Store) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authService.GetToken();
    const exp = this.authService.GetExpTime();
    const re = /farm-crop-details/;
    if (token) {
      if (request.url.search(re) === -1) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          // if (this.authService.isTokenExpired(exp)) {
          //   console.log(exp)
          //   this.state.dispatch(logOutAction({msg: this.refresh}))
          // }
          if (err.status === 401) {
            if (request.url.search(re) !== -1) {
              return next.handle(request)
            }
            localStorage.clear();
            // this.handleRefreshToken(request, next)
          }
        }
        return throwError(err)
      })
    );
    // let token = request.clone({
    //   setHeaders: {
    //     // Authorization: 'bearer' + this.authService.GetToken()
    //     Authorization: `bearer ${this.authService.GetToken()}`
    //   }
    // // });
    // console.log('token int', token);
    // return next.handle(token);
  }

  addTokenHeader(request:HttpRequest<any>) {
    const token = this.authService.GetToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    this.store.dispatch(refreshTokenAction({refresh: this.refresh}));
    const token = this.authService.GetToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request),
      catchError((err)=> {
        this.store.dispatch(logOutAction({msg: this.refresh}))
        return throwError(err)
      })
  }

}

import {createAction, props} from "@ngrx/store";
import {AuthActionTypes} from "./auth.action-types";
import {
  LoginUserInterface,
  RefreshTokenFailInterface,
  RefreshTokenInterface,
  SignUpUserInterface,
  UserModelInterface
} from "../types/userModel";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";

export const signUpAction = createAction(
  AuthActionTypes.REGISTER,
  props<{ signup: SignUpUserInterface }>()
)

export const signUpSuccess = createAction(
  AuthActionTypes.REGISTER_SUCCESS,
  props<{user: any}>()
)

export const signUpFail = createAction(
  AuthActionTypes.REGISTER_FAIL,
  props<{err: string}>()
)

export const loginAction = createAction(
  AuthActionTypes.LOGIN,
  props<{login: LoginUserInterface}>()
)
export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{user: UserModelInterface}>()
)

export const loginFail = createAction(
  AuthActionTypes.LOGIN_FAIL,
  props<{err: string}>()
)

export const logOutAction = createAction(
  AuthActionTypes.LOGOUT,
  props<{msg: string}>()
)
export const logOutActionSuccess = createAction(
  AuthActionTypes.LOGOUT_SUCCESS,
  props<{msg: string}>()

)
export const logOutActionFail = createAction(
  AuthActionTypes.LOGOUT_FAIL,
  props<{msg: string}>()
)

export const refreshTokenAction = createAction(
  AuthActionTypes.REFRESH,
  props<{refresh: string}>()
)

export const refreshTokenActionSuccess = createAction(
  AuthActionTypes.REFRESH_SUCCESS,
  props<{refresh: RefreshTokenInterface}>()
)
export const refreshTokenActionFail = createAction(
  AuthActionTypes.REFRESH_FAIL,
  props<{refresh: RefreshTokenFailInterface}>()
)

export const updateUserAction = createAction(
  AuthActionTypes.UPDATE_USER,
  props<{updateUser: any}>()
)

export const updateUserActionSuccess = createAction(
  AuthActionTypes.UPDATE_USER_SUCCESS,
  props<{updateUser: CurrentUserInterface}>()
)

export const updateUserActionFail = createAction(
  AuthActionTypes.UPDATE_USER_FAIL,
  props<{error: any}>()
)
// admin@prodtrace.com
// prodtrace

export enum AuthActionTypes {
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAIL = '[Auth] Register Fail',

  LOGIN = '[AUTH] Login Request',
  LOGIN_SUCCESS = '[AUTH] Login Success',
  LOGIN_FAIL = '[AUTH] Login Fail',

  LOGOUT = '[AUTH] Logout Request',
  LOGOUT_SUCCESS = '[AUTH] Logout Request Success',
  LOGOUT_FAIL = '[AUTH] Logout Request Fail',

  REFRESH = '[AUTH] Refresh Token Request',
  REFRESH_SUCCESS = '[AUTH] Refresh Token Request Success',
  REFRESH_FAIL = '[AUTH] Refresh Token Request Fail',

  AUTO_LOGIN = '[Auth] Auto login',
  AUTO_LOGIN_SUCCESS = '[Auth] Auto login Success',
  AUTO_LOGIN_FAIL = '[Auth] Auto login Fail',

  UPDATE_USER = '[UPDATE_USER] Update user Request',
  UPDATE_USER_SUCCESS = '[UPDATE_USER] Update user Request Success',
  UPDATE_USER_FAIL = '[UPDATE_USER] Update user Request Fail',
}

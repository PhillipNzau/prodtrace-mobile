import {Action, createReducer, on} from "@ngrx/store";

import {AuthStateInterface} from "../types/authStateInterface";
import * as action from "./auth.actions";

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  loggedInUser: null,
  validationErrors: '',
  isLoggedIn: false,

}

const authReducer = createReducer(
  initialState,
  ///////SIGN IN
  on(action.signUpAction, (state: AuthStateInterface) => ({
    ...state,
    isSubmitting: true
  })),

  on(action.signUpSuccess, (state, {user}) => {
    return {
      ...state,
      isSubmitting: false,
      currentUser:user,
      isLoggedIn: false,

    }
  }),

  on(action.signUpFail, (state, {err}) => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
      validationErrors:err
    }
  }),

  ///////lOG IN
  on(action.loginAction, (state: AuthStateInterface) => ({
    ...state,
    isSubmitting: true,
  })),

  on(action.loginSuccess, (state, {user}) => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser:user,
      loggedInUser: user.user
    }
  }),

  on(action.loginFail, (state, {err}) => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: false,
      validationErrors:err
    }
  }),

  ////////LOG OUT
  on(action.logOutAction, (state, {msg}) => {
    return {
      ...state,
      isSubmitting: true,
      isLoggedIn: true,

    }
  }),

  on(action.logOutActionSuccess, (state, {msg}) => {
    return state = initialState
  }),

  on(action.logOutActionFail, (state, {msg}) => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      validationErrors:msg
    }
  }),

  ////////REFRESH TOKEN
  on(action.refreshTokenAction, (state, {refresh}) => {
    return {
      ...state,
      isSubmitting: true,

    }
  }),

  on(action.refreshTokenActionSuccess, (state, {refresh}) => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: true,

    }
  }),

  on(action.refreshTokenActionFail, (state, {refresh}) => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: false,

    }
  }),

  ////////UPDATE USER
  on(action.updateUserAction, (state: AuthStateInterface) => ({
    ...state,
    isSubmitting: true,
  })),
  on(action.updateUserActionSuccess, (state: AuthStateInterface, {updateUser}) => ({
    ...state,
    isSubmitting: false,
    loggedInUser: updateUser
  })),
  on(action.updateUserActionFail, (state: AuthStateInterface, {error}) => ({
    ...state,
    isSubmitting: true,
    validationErrors: error
  })),


);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}


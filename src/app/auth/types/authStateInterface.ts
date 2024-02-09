import {UserModelInterface} from "./userModel";
import {CurrentUserInterface} from "../../shared/types/currentUser.interface";

export interface AuthStateInterface {
  isSubmitting: boolean,
  currentUser: UserModelInterface | null,
  loggedInUser: CurrentUserInterface |  null,
  validationErrors: string,
  isLoggedIn: boolean | null

}

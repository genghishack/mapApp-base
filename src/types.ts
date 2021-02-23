import {ChangeEventHandler} from "react";

export type FieldState = {
  fields: any;
  handleFieldChange: ChangeEventHandler;
}

export type LoadingState = {
  isLoading: boolean;
  setIsLoading: Function;
}

export type NewUserState = {
  newUser: any;
  setNewUser: Function;
}

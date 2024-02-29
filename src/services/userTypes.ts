export interface User {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
}

export interface UserSignInPayload {
  email: string;
  password: string;
}

export interface UserSignUpPayload {
  name: string;
  email: string;
  surname: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserForgotPasswordPayload {
  email: string;
}

export interface UserResetPasswordPayload {
  token: string | null;
  password: string;
  passwordConfirmation: string;
}

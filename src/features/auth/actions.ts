import { postFetch } from "src/lib/fetch";
import { successResponseType } from "src/lib/types";

export default function LoginAction(payload: {
  username: string;
  password: string;
}) {
  return new Promise<successResponseType>((resolve, reject) => {
    postFetch(`/auth/login`, payload)
      .then((response: successResponseType) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function ResetPasswordAction(payload: { email: string }) {
  return new Promise((resolve, reject) => {
    postFetch("/auth/forgot-password", payload)
      .then((data: any) => resolve(data))
      .catch((error) => reject(error));
  });
}

export function SetNewPasswordAction(payload: {
  recoveryEmail: string;
  code: string;
  newPassword: string;
}) {
  return new Promise((resolve, reject) => {
    postFetch("/auth/set-new-password", payload)
      .then((data: any) => resolve(data))
      .catch((error) => reject(error));
  });
}

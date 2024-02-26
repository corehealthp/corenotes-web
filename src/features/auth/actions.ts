import { postFetch } from "src/lib/fetch";
import { successResponseType } from "src/lib/types";

export function LoginAction(payload: {
  username: string;
  password: string;
}) {
  return new Promise<successResponseType>((resolve, reject) => {
   
    postFetch(`/auth/login`, payload)
      .then((response: successResponseType) => {
        const user_data = {
          firstname: response.data?.user?.firstname,
          lastname: response.data?.user?.lastname,
          role: response.data?.user?.title,
        };
        console.log(user_data, "user")
        localStorage.setItem("sid.set", "true");
        localStorage.setItem("sid", response.data?.user?.accessToken);
        localStorage.setItem("user_id", response.data?.user?._id);
        localStorage.setItem("user_data", JSON.stringify(user_data));
        resolve(response)
      })
      .catch((error) => reject(error));
  });
}

export function LogoutAction() {
  return new Promise<successResponseType>((resolve, reject) => {
    postFetch(`/auth/logout`, {})
      .then((response: successResponseType) => resolve(response))
      .catch((error) => reject(error));
  });
}

// export function ResetPasswordAction(payload: { email: string }) {
//   return new Promise((resolve, reject) => {
//     postFetch("/auth/forgot-password", payload)
//       .then((data: any) => resolve(data))
//       .catch((error) => reject(error));
//   });
// }

export function SendOtpAction(payload: { email: string }) {
  return new Promise((resolve, reject) => {
    postFetch("/staffs/forgot-password", payload)
      .then((data: any) => resolve(data))
      .catch((error) => reject(error));
  });
}

export function SetNewPasswordAction(payload: any) {
  return new Promise((resolve, reject) => {
    postFetch("/staffs/password-reset", payload)
      .then((data: any) => resolve(data))
      .catch((error) => reject(error));
  });
}

import { getFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { IUser } from "../staff/types";

export interface fetchUserSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: {
        user: IUser
    }
}

export function fetchUserProfile() {
    return new Promise<fetchUserSuccessResponseType>((resolve, reject)=> {
        getFetch('/user/profile')
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    user: response.data.user
                }
            });
        })
        .catch((error)=> {
            reject(error);
        })
    });
}
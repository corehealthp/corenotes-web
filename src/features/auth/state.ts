import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authStateType } from "./types";

export const authInitState:authStateType = {
    isSignedIn: (localStorage.getItem('sid.set')) ? true : false,
    status: 'IDLE',
    error: false,
    message: '',
    signupDetails: {
        email: "",
        fullname: "",
        password: "",
        phoneNumber: "",
        bank: {
            name: "",
            accountNumber: "",
            accountName: ""
        }
    },
    bankVerification: {
        verified: false,
        bankCode: "",
        bankName: "",
        accountNumber: "",
        accountName: ""
    }
}

const AuthAtom = atom({
    key: 'authState',
    default: authInitState
})

export const useAuthState = ()=> useRecoilState(AuthAtom);
export const useAuthStateValue = ()=> useRecoilValue(AuthAtom);
export const useSetAuthState = ()=> useSetRecoilState(AuthAtom);

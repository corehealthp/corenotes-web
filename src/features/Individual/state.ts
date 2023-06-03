import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IndividualStateType } from "./types";

export const individualInitState:IndividualStateType = {
    status: 'IDLE',
    error: false,
    message: '',
    list: [],
    currentListPage: 1,
    totalListPages: 1,
    newIndividual: {
        firstname: '',
        middlename: '',
        lastname: '',
        nickname: '',
        dob:'',
        gender: '',
        religion: '',
        ssn: '',
        contact: {
            name: '',
            email: '',
            phoneNumber: ''
        },
        weight: '',
        medicaidNumber: 0,
        maritalStatus: '',
        codeAlert: [],
        requestedServices:[],
        diet: [],
        allergies: {
            food: [],
            med: [],
            other: []
        }
    },
    profile: {
        id: '',
        personalInformation: {
            profileImage: '',
            firstName: '',
            middleName: '',
            lastName: '',
            nickName: '',
            dob: '',
            gender: '',
            maritalStatus: '',
            religion: '',
            ssn: '',
            weight: 0,
            contact: {
                name: '',
                email: '',
                phoneNumber: '',
            },
            medicaidNumber: 0,
            compartment: ''
        },
        healthInformation: {
            diet: [],
            allergies: {
                food: [],
                meds: [],
                others: []
            }
        }
    },
    assessments:{
        list: [],
        currentPage: 1,
        totalPages: 1,
        session: {
            id:'',
            title:'',
            category:'',
            questions:[],
            status:'PENDING'
        }
    }
}

export const IndividualAtom = atom({
    key: 'individualState',
    default: individualInitState  
});

export const useIndividualStateValue = ()=> useRecoilValue(IndividualAtom);
export const useIndividualState = ()=> useRecoilState(IndividualAtom);
export const useSetIndividualState = ()=> useSetRecoilState(IndividualAtom);
import { getFetch, patchFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { IndividualListItemType, IndividualProfileResponseType } from "./types"
import { AssessmentModelType } from "../assessment/types"

export interface IndividualListItemResponseType extends Omit<IndividualListItemType, 'age'> {
    dob: string
}

export interface IndividualListResponseType extends Omit<successResponseType, 'data'> {
    data: { 
        individuals:IndividualListItemResponseType[],
        currentListPage:number
        totalListPage:number
    }
}

export interface IndividualProfileSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: { 
        individual:IndividualProfileResponseType,
    }
}

export function registerIndividualAction(payload:FormData) {
    return new Promise<IndividualListResponseType>((resolve, reject)=> {
        postFetch('/individuals', payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    individuals: response.data.individuals,
                    currentListPage: response.data.currentListPage,
                    totalListPage: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject({error}))
    })
}

export function fetchIndividualListAction(pageNumber:number) {
    return new Promise<IndividualListResponseType>((resolve, reject)=> {
        getFetch(`/individuals/${pageNumber}`)
        .then((response:successResponseType)=> resolve({
            ...response, 
            data: { 
                currentListPage: response.data.currentListPage,
                totalListPage: response.data.totalListPages,
                individuals: response.data.individuals
            }
        }))
        .catch((error)=> {
            reject(error)
        })
    })
}

export function fetchIndividualProfileAction(id:string) {
    return new Promise<IndividualProfileSuccessResponseType>((resolve, reject)=> {
        getFetch(`/individuals/profile/${id}`)
        .then((response:successResponseType)=> resolve({
            ...response, 
            data: {
                individual: response.data.individual
            }
        }))
        .catch((error)=> {
            reject(error)
        })
    })
}

export interface IndividualAssessmentSessionResponseType extends Omit<successResponseType, 'data'> {
    data: {
        assessmentDetails: AssessmentModelType
    }
}

export function fetchIndividualAssessmentSessionAction(assessmentId:string) {
    return new Promise<IndividualAssessmentSessionResponseType>((resolve, reject)=> {
        getFetch(`/individuals/assessments/${assessmentId}/session`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { assessmentDetails: response.data.individualAssessmentSession }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}



export function saveAssessmentSessionAction(assessmentId:string, payload:Pick<AssessmentModelType, 'questions'>) {
    return new Promise<IndividualAssessmentSessionResponseType>((resolve, reject)=> {
        patchFetch(`/individuals/assessments/${assessmentId}/session`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { assessmentDetails: response.data.individualAssessmentSession }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

export function completeAssessmentSessionAction(assessmentId:string, payload:Pick<AssessmentModelType, 'questions'>) {
    return new Promise<IndividualAssessmentSessionResponseType>((resolve, reject)=> {
        postFetch(`/individuals/assessments/${assessmentId}/session`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { assessmentDetails: response.data.individualAssessmentSession }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}
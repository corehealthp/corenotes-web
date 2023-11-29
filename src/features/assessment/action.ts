import { getFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { AssessmentListItemType, AssessmentModelType } from "./types";

export interface AssessmentListResponseType extends Omit<successResponseType, 'data'> {
    data: {
        list:AssessmentListItemType[];
        currentPage:number;
        totalPages:number;
    }
}

export interface ICreateAssessmentPayload {
    title:string;
    category:string;
    questions:Array<{category:string, question:string}>;
}

export function createAssessmentAction(payload:ICreateAssessmentPayload) {
    return new Promise<AssessmentListResponseType>((resolve, reject)=> {
        postFetch('/assessments', payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    list: response.data.assessments,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function fetchAssessmentsAction(pageNumber:number) {
    return new Promise<AssessmentListResponseType>((resolve, reject)=> {
        getFetch(`/assessments/${pageNumber}`)
        .then((response:successResponseType)=> {
            
            resolve({
                ...response,
                data: {
                    list: response.data.assessments,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages
                }
            })
        })
        .catch((error)=> reject({error}))
    })
}

export interface IGetAssessmentDetailsActionResponse extends successResponseType {
    data:{
        assessment:AssessmentModelType
    }
}

export function getAssessmentDetailsAction(assessmentId:string) {
    return new Promise<IGetAssessmentDetailsActionResponse>((resolve, reject)=> {
        getFetch(`/assessments/details/${assessmentId}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    assessment: response.data.assessment
                }
            })
        })
        .catch((error)=> reject(error))
    });
}

export interface AssessmentCategoriesResponseType extends Omit<successResponseType, 'data'> {
    data: {
        assessmentCategories: {
            id:string,
            name:string
        }[],
        questionCategories: {
            id:string,
            name:string
        }[]
    }
}

export function fetchAssessmentCategoriesAction() {
    return new Promise<AssessmentCategoriesResponseType>((resolve, reject)=> {
        getFetch(`/assessments/categories`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { 
                    assessmentCategories: response.data.assessmentCategories,
                    questionCategories: response.data.questionCategories,
                }
            })
        })
        .catch((error)=> {
            console.log(error)
            reject(error)
        })
    })
}

export interface AssessmentQuestionCategoriesResponseType extends Omit<successResponseType, 'data'> {
    data: {
        questionCategories: {
            id:string,
            name:string
        }[]
    }
}

export function createAssessmentCategoryAction(payload:{assessmentCategoryName:string}) {
    return new Promise<AssessmentCategoriesResponseType>((resolve, reject)=> {
        postFetch(`/assessments/assessment-categories`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { 
                    assessmentCategories: response.data.assessmentCategories,
                    questionCategories: response.data.questionCategories,
                }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

export function createAssessmentQuestionCategoryAction(payload:{questionCategoryName:string}) {
    return new Promise<AssessmentCategoriesResponseType>((resolve, reject)=> {
        postFetch(`/assessments/question-categories`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { 
                    assessmentCategories: response.data.assessmentCategories,
                    questionCategories: response.data.questionCategories,
                }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

export function uploadAssessmentCSVAction(payload:FormData) {
    return new Promise<AssessmentListResponseType>((resolve, reject)=> {
        postFetch(`/assessments/upload-with-csv`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    list: response.data.assessments,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

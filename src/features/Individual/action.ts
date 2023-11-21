import { getFetch, patchFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { IDailyLivingActivity, IGoalService, IIndividualAssessmentSession, IIndividualAssessmentSessionQuestion, IIndividualAssessmentsList, IIndividualBehaviorService, IIndividualChoreService, IIndividualDocumentsList, IIndividualMedicationsListItem, ISupervisoryMedicationReviews, IndividualListItemType, IndividualProfileResponseType, IndividualServiceListItemType } from "./types"
import { AssessmentListResponseType } from "../assessment/action"

export interface IndividualListResponseType extends Omit<successResponseType, 'data'> {
    data: { 
        list:IndividualListItemType[],
        currentListPage:number
        totalListPages:number
    }
}

export interface IndividualProfileSuccessResponseType extends Omit<successResponseType, 'data'> {
    data: { 
        individual:IndividualProfileResponseType,
    }
}

export function registerIndividualAction(payload:any) {
    return new Promise<IndividualListResponseType>((resolve, reject)=> {
        postFetch('/individuals', payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    list: response.data.individuals,
                    currentListPage: response.data.currentListPage,
                    totalListPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject({error}))
    })
}

export function fetchIndividualListAction(pageNumber:number) {
    return new Promise<IndividualListResponseType>((resolve, reject)=> {
        getFetch(`/individuals/${pageNumber}`)
        .then((response:successResponseType)=> {
            resolve({
                ...response, 
                data: { 
                    currentListPage: response.data.currentListPage,
                    totalListPages: response.data.totalListPages,
                    list: response.data.individuals
                }
            })
        })
        .catch((error)=> reject(error.response.data))
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

export interface IFetchIndividualAssessmentsResponse extends Omit<successResponseType, 'data'> {
    data: { 
        individualAssessments: {
            list: IIndividualAssessmentsList[],
            currentPage:number;
            totalPages:number;
        }
    }
}

export function fetchIndividualAssessmentsList(individualId:number, pageNumber:number) {
    return new Promise<IFetchIndividualAssessmentsResponse>((resolve, reject)=> {
        getFetch(`individuals/${individualId}/assessments/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: { individualAssessments: response.data.individualAssessments }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IndividualAssessmentSessionResponseType extends Omit<successResponseType, 'data'> {
    data: {
        assessmentSession:IIndividualAssessmentSession
    }
}

export function fetchIndividualAssessmentSessionAction(individualId:number, assessmentId:string) {
    return new Promise<IndividualAssessmentSessionResponseType>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/assessments/${assessmentId}/session`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { assessmentSession: response.data.assessmentSession }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function saveAssessmentSessionAction(assessmentId:string, payload:any) {
    return new Promise<IndividualAssessmentSessionResponseType>((resolve, reject)=> {
        patchFetch(`/individuals/assessments/${assessmentId}/session`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { assessmentSession: response.data.individualAssessmentSession }
            })
        })
        .catch((error)=> {
            reject(error)
        })
    })
}

interface ICompleteAssessmentSession {
    questions:Array<IIndividualAssessmentSessionQuestion>
}

export function completeAssessmentSessionAction(individualId:number, assessmentId:string, payload:ICompleteAssessmentSession) {
    return new Promise<IndividualAssessmentSessionResponseType>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/assessments/${assessmentId}/session`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { assessmentSession: response.data.assessmentSession }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IndividualServicesSuccessResponseType extends successResponseType {
    data: {
        individualServices:IndividualServiceListItemType[]
    }
}

export function fetchIndividualServicesAction(individualId:string) {
    return new Promise<IndividualServicesSuccessResponseType>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/services`)
        .then((response)=> {
            resolve({
                ...response,
                data: { individualServices: response.data.individualServices }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IAddServiceToIndividualPayload {
    serviceId:string;
    schedule: {
        startDate:string;
        time:string;
        frequency:string;
        frequencyAttr:number;
    }|null
}

export function addServiceToIndividualAction(individualId:string, payload:IAddServiceToIndividualPayload) {
    return new Promise<IndividualServicesSuccessResponseType>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/services`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { individualServices: response.data.individualServices }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IIndividualMedicationsSuccessResponse extends Omit<successResponseType, 'data'> {
    data: { 
        list:IIndividualMedicationsListItem[],
        currentPage:number
        totalPages:number
    }
}

export function fetchIndividualMedicationsAction(individualId:number, pageNumber:number) {
    return new Promise<IIndividualMedicationsSuccessResponse>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/medications/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.medications 
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAddMedicationToIndividualPayload {
    medicationId:string;
    schedule:{
        startDate:string;
        frequency:string;
        frequencyAttr:number;
        time:string;
    },
    amountAllocated:number;
}

export function addMedicationToIndividualAction(individualId:number, payload:IAddMedicationToIndividualPayload) {
    return new Promise<IIndividualMedicationsSuccessResponse>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/medications`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.medications 
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAddPRNMedicationToIndividualPayload {
    individualMedicationId:string;
    selectedMedicationId:string;
    note:string;
    amountAdministered:number;
}

export function administerPRNMedicationToIndividualAction(individualId:string, payload:IAddPRNMedicationToIndividualPayload){
    return new Promise<successResponseType>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/medications/prn-medication`, payload)
        .then((response)=> resolve({
            ...response
        }))
        .catch((error)=> reject(error))
    })
}

export function discontinueIndividualMedicationAction(individualId:number, payload:{medicationId:number, active:boolean, currentPage:number}) {
    return new Promise<IIndividualMedicationsSuccessResponse>((resolve, reject)=> {
        patchFetch(`/individuals/${individualId}/medications/toggle`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.medications 
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAllocateMedicationPillsPayload {
    medicationId:number;
    newAmountAllocated:number;
    newPharmacy:string;
}

// export function addNewAllocationAction(individualId:number, payload:IAllocateMedicationPillsPayload) {
//     return new Promise<IIndividualMedicationsSuccessResponse>((resolve, reject)=> {
//         patchFetch(`/individuals/${individualId}/medications/pills-allocation`, payload)
//         .then((response)=> {
//             resolve({
//                 ...response,
//                 data: {
//                     currentPage: response.data.currentPage,
//                     totalPages: response.data.totalPages,
//                     list: response.data.medications 
//                 }
//             })
//         })
//         .catch((error)=> reject(error))
//     })
// }

export interface IIndividualSupervisoryReviewsListResponse extends Omit<successResponseType, 'data'> {
    data: {
        medicationId:string;
        currentPage:number;
        totalPages:number;
        list:ISupervisoryMedicationReviews[];
        lastMonthReviewed?:number;
    }
}

export function submitSupervisoryMedReviewAction(individualId:number, payload:IAllocateMedicationPillsPayload) {
    return new Promise<IIndividualSupervisoryReviewsListResponse>((resolve, reject)=> {
        patchFetch(`/individuals/${individualId}/medications/supervisory-medication-review`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    medicationId: response.data.medicationId,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.supervisoryReviews,
                    lastMonthReviewed: response.data.lastMonthReviewed
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function fetchIndividualSupervisoryReviewHistoryAction(individualId:number, medId:number, pageNumber:number) {
    return new Promise<IIndividualSupervisoryReviewsListResponse>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/medications/${medId}/supervisory-medication-review/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    medicationId: response.data.medicationId,
                    list: response.data.supervisoryReviews,
                    lastMonthReviewed: response.data.lastMonthReviewed
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IIndividualGoalServicesSuccessResponse extends Omit<successResponseType, 'data'> {
    data: { 
        list:IGoalService[],
        currentPage:number
        totalPages:number
    }
}

interface IAddGoalServiceToIndividualPayload {
    objective:string;
    method:string;
    schedule: {
        startDate:string;
        time:string;
        frequency:string;
        frequencyAttr:number;
    }
}

export function addGoalToIndividualAction(individualId:string, payload:IAddGoalServiceToIndividualPayload) {
    return new Promise<IIndividualGoalServicesSuccessResponse>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/services/goal-tracking`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.goals 
                }
            })
        })
        .catch((error)=> reject(error))
    })
} 

export function fetchIndividualGoalsAction(individualId:number, pageNumber:number) {
    return new Promise<IIndividualGoalServicesSuccessResponse>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/services/goal-tracking/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.goals 
                }
            })
        })
        .catch((error)=> reject(error))
    })
}
    
export interface IIndividualDailyLivingActivityServicesSuccessResponse extends Omit<successResponseType, 'data'> {
    data: { 
        list:IDailyLivingActivity[];
        currentPage:number;
        totalPages:number;
    }
}

export function fetchIndividualDailyLivingActivitiesListAction(individualId:number, pageNumber:number) {
    return new Promise<IIndividualDailyLivingActivityServicesSuccessResponse>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/services/daily-living-activity/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.dailyLivingActivities
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAddActivityServiceToIndividualPayload {
    title:string;
    instructions:string;
    schedule: {
        startDate:string;
        time:string;
        frequency:string;
        frequencyAttr:number;
    }
}

export function addDailyLivingActivityToIndividualAction(individualId:string, payload:IAddActivityServiceToIndividualPayload) {
    return new Promise<IIndividualDailyLivingActivityServicesSuccessResponse>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/services/daily-living-activity`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.dailyLivingActivities
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IIndividualBehaviorManagementServicesSuccessResponse extends Omit<successResponseType, 'data'> {
    data: { 
        list:IIndividualBehaviorService[];
        currentPage:number;
        totalPages:number;
    }
}

export function fetchIndividualBehaviorManagementServicesListAction(individualId:number, pageNumber:number) {
    return new Promise<IIndividualBehaviorManagementServicesSuccessResponse>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/services/behavior-management/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.behaviorManagementServices
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAddbehaviorServiceToIndividualPayload {
    description:string;
    goals:Array<string>;
    schedule: {
        startDate:string;
        time:string;
        frequency:string;
        frequencyAttr:number;
    }
}

export function addBehaviorToIndividualAction(individualId:string, payload:IAddbehaviorServiceToIndividualPayload) {
    return new Promise<IIndividualBehaviorManagementServicesSuccessResponse>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/services/behavior-management`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.behaviorManagementServices
                }
            })
        })
        .catch((error)=> reject(error))
    })
}


// Chore services *************************************
export interface IIndividualChoreServicesSuccessResponse extends Omit<successResponseType, 'data'> {
    data: { 
        list:IIndividualChoreService[];
        currentPage:number;
        totalPages:number;
    }
}

export function fetchIndividualChoreServicesListAction(individualId:number, pageNumber:number) {
    return new Promise<IIndividualChoreServicesSuccessResponse>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/services/chore/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.choreServices
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

interface IAddChoreServiceToIndividualPayload {
    description:string;
    schedule: {
        startDate:string;
        time:string;
        frequency:string;
        frequencyAttr:number;
    }
}

export function addChoreToIndividualAction(individualId:string, payload:IAddChoreServiceToIndividualPayload) {
    return new Promise<IIndividualChoreServicesSuccessResponse>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/services/chore`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: {
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages,
                    list: response.data.choreServices
                }
            })
        })
        .catch((error)=> reject(error))
    })
}
// ****************************************************

export interface fetchIndividualDocumentsSuccessResponseType extends Omit<successResponseType, 'data'> {
    data:IIndividualDocumentsList;
}

export function fetchIndividualDocumentsAction(individualId:string, pageNumber:number) {
    return new Promise<fetchIndividualDocumentsSuccessResponseType>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/documents/${pageNumber}`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    currentPage:response.data.currentPage,
                    totalPages:response.data.totalPages,
                    list: response.data.list
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function uploadIndividualDocumentAction(individualId:string, payload:FormData) {
    return new Promise<fetchIndividualDocumentsSuccessResponseType>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/documents`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: {
                    currentPage:response.data.currentPage,
                    totalPages:response.data.totalPages,
                    list: response.data.documents
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function addAssessmentToIndividualAction(individualId:string, payload:{ assessments:string[] }) {
    return new Promise<IFetchIndividualAssessmentsResponse>((resolve, reject)=> {
        postFetch(`/individuals/${individualId}/assessments`, payload)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { individualAssessments: response.data.individualAssessments }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function fetchAssessmentsToAssignAction(individualId:number, pageNumber:number) {
    return new Promise<AssessmentListResponseType>((resolve, reject)=> {
        getFetch(`/individuals/${individualId}/unassigned-assessments/${pageNumber}`)
        .then((response)=> {
            console.log(response)
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
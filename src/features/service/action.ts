import { getFetch, postFetch } from "src/lib/fetch"
import { successResponseType } from "src/lib/types"
import { ServiceDetails, ServicesListItemType } from "./types"
import { IndividualListItemType } from "../Individual/types"

export interface GetServicesResponse extends successResponseType {
    data: {
        services:ServicesListItemType[],
        currentPage:number,
        totalPages:number
    }
}

export function getServicesList(pageNumber:number) {
    return new Promise<GetServicesResponse>((resolve, reject)=> {
        getFetch(`/services/${pageNumber}`)
        .then((response:successResponseType)=> {
            resolve({
                ...response,
                data: { 
                    //@ts-ignore
                    services: response.data,
                    currentPage: response.data.currentListPage,
                    totalPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export function getAllProvidedServiceAction(pageNumber:number) {
    return new Promise<GetServicesResponse>((resolve, reject)=> {
        getFetch(`/services/provided/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    services: response.data.services,
                    currentPage: response.data.currentListPage,
                    totalPages: response.data.totalListPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface newServiceData {
    title:string,
    category:string,
    compartments?:Array<string>
}

export function postService(payload:newServiceData) {
    return new Promise<GetServicesResponse>((resolve, reject)=> {
        postFetch(`/services`, payload)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    services: response.data.services,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IGetServiceDetailsResponse extends successResponseType {
    data: { service:ServiceDetails }
}

export function getServiceDetails(serviceId:number) {
    return new Promise<IGetServiceDetailsResponse>((resolve, reject)=> {
        getFetch(`/services/${serviceId}/details`)
        .then((response)=> {
            resolve({
                ...response,
                data: { service: response.data.service }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IGetServiceIndividualsResponse extends Omit<successResponseType, 'data'> {
    data: {
        list:IndividualListItemType[];
        currentPage:number;
        totalPages:number;
    }
}

export function getServiceIndividuals(serviceId:number, pageNumber:number) {
    return new Promise<IGetServiceIndividualsResponse>((resolve, reject)=> {
        getFetch(`/services/${serviceId}/individuals/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    list: response.data.individuals,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}

export interface IGetServiceListByCategoryResponse extends successResponseType {
    data: {
        list:ServicesListItemType[];
        currentPage:number;
        totalPages:number;
    }
}

export function getServicesListByCategory(category:string, pageNumber:number) {
    return new Promise<IGetServiceListByCategoryResponse>((resolve, reject)=> {
        getFetch(`/services/category/${category}/${pageNumber}`)
        .then((response)=> {
            resolve({
                ...response,
                data: { 
                    list: response.data.services,
                    currentPage: response.data.currentPage,
                    totalPages: response.data.totalPages
                }
            })
        })
        .catch((error)=> reject(error))
    })
}


// export function fetchMedicationsListAction(pageNumber:number) {
//     return new Promise<IFetchMedicationListResponse>((resolve, reject)=> {
//         getFetch(`/services/${serviceObjectId}/medications/${pageNumber}`)
//         .then((response)=> {
//             resolve({
//                 ...response,
//                 data: { 
//                     list: response.data.medications,
//                     currentPage: response.data.currentPage,
//                     totalPages: response.data.totalPages
//                 }
//             })
//         })
//         .catch((error)=> reject(error))
//     })
// }

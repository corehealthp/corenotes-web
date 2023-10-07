import { IndividualListItemType } from "../Individual/types";
import { initStateType } from "../types";

export interface IServiceStateType extends initStateType {
    servicesList:ServicesListItemType[],
    currentListPage:number,
    totalListPages:number,
    service:ServiceDetails
}

export interface ServicesListItemType {
    id:string,
    serviceId:string,
    title:string,
    refName:string;
    assignedIndividualsCount:number,
    createdAt:string,
    category:string,
}

export interface ServiceDetails {
    id:string,
    title:string
    serviceId:string,
    createdAt:string,
    category:string,
    individuals: {
        list:IndividualListItemType[],
        currentPage:number,
        totalPages:number
    },
    staffs: {
        list:[],
        currentPage:number,
        totalPages:number
    },
    assessments:{
        list:[],
        currentPage:number,
        totalPages:number
    }
}
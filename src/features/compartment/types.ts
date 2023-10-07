import { initStateType } from "../types";

export interface CompartmentStateType extends initStateType {
    compartmentsList:CompartmentListItem[],
    currentListPage:number,
    totalListPages:number,
    compartment:CompartmentDetails,
}

export interface CompartmentListItem {
    id:string;
    compartmentId:number;
    title:string;
    image:string;
    subCompartmentsCount:number;
    staffRolesCount:number;
    assignedIndividualsCount:number;
    meta: {
        bgColor:string;
        labelColor:string;
    }
}

export interface CompartmentDetails {
    id:string;
    compartmentId:number;
    title:string;
    image:string;
    subCompartments:Array<{
        id:string;
        title:string;
        description:string;
        staffRolesCount:number;
        individualsCount:number;
        servicesCount:number;
        createdAt:string;
    }>;
    services:Array<ICompartmentServices>;
    meta: {
        bgColor:string;
        labelColor:string;
    };
}

export interface ICompartmentServices {
    id:string;
    title:string;
    refName:string;
}
import { initStateType } from "../types";

export interface ITaskState extends initStateType {
    tasks:{
        list:Array<ITask>;
        currentPage:number;
        totalPages:number;
    },
    taskDetails:ITaskDetails
}

export interface ITask {
    id:string;
    taskId:number;
    status:string;
    desc:string;
    service:{
        title:string;
    };
    individual:{
        id:string;
        firstname:string;
        lastname:string;
        profileImage:string;
    },
    schedule:{
        startAt:Date;
        endAt:Date;
    }
}

export interface ITaskDetails {
    id:string;
    taskId:number;
    status:string;
    service:{
        title:string;
    };
    medication?:{
        id:string;
        name:string;
        strength:string;
        route:string;
        indications:Array<string>;
        amountLeft:number;
        category:string;
        PRN:Array<IPRNMedication>;
    };
    prnMedicationReview?:IPRNMedication;
    goalTracking:{
        id:string;
        objective:string;
        method:string;
    },
    individual:{
        id:string;
        firstname:string;
        lastname:string;
        profileImage:string;
    },
    schedule:{
        startAt:Date;
        endAt:Date;
    },
    dailyLivingActivity:{
        id:string;
        title:string;
        instructions:string;
    },
    behaviorManagement:{
        id:string;
        description:string;
        goals:string[];
    },
    chore:{
        id:string;
        title:string;
        description:string;
    },
    bowelMovement:{
        hasNotMovedIn2Days:boolean
    }
}

export interface IPRNMedication {
    id:string;
    title:string;
    note:string;
    name:string;
    amountAdministered:number;
    createdAt:Date;
}
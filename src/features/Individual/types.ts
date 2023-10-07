import { initStateType } from "../types";

export interface IndividualStateType extends initStateType {
    servicesWithTemplate:string[];
    individuals:{
        list:IndividualListItemType[];
        currentListPage:number;
        totalListPages:number;
    },
    newIndividual:NewIndividualType;
    profile: IndividualProfileType;
    assessments: {
        list: IIndividualAssessmentsList[];
        currentPage:number;
        totalPages:number;
        session: IIndividualAssessmentSession;
    },
    services:IndividualServiceListItemType[];
    medications: {
        list:Array<IIndividualMedicationsListItem>;
        currentPage:number,
        totalPages:number
    },
    supervisoryMedicationReviews:{
        medicationId:string;
        lastMonthReviewed?:number;
        list: ISupervisoryMedicationReviews[];
        currentPage:number;
        totalPages:number;
    };
    goalServices:{
        list:IGoalService[];
        currentPage:number;
        totalPages:number;
    },
    dailyLivingActivities:{
        list:IDailyLivingActivity[];
        currentPage:number;
        totalPages:number;
    },
    behaviorsServices:{
        list:IIndividualBehaviorService[];
        currentPage:number;
        totalPages:number;
    },
    choreServices: {
        list:IIndividualChoreService[];
        currentPage:number;
        totalPages:number;
    },
    documents:IIndividualDocumentsList
}

export interface IIndividualDocumentsList {
    list:Array<IIndividualDocument>;
    currentPage:number;
    totalPages:number;
}

export interface IIndividualDocument {
    id:string,
    docTitle: string,
    docType: string,
    docDate: string,
    docFileLink: string,
    docFileName: string,
    createdAt:string
}

export interface IIndividualChoreService {
    id:string;
    description:string;
    frequency:string;
    time:Array<string>;
    createdAt:Date;
}

export interface IIndividualBehaviorService {
    id:string;
    description:string;
    goals:Array<string>;
    frequency:string;
    time:string;
    endDate:string;
}

export interface IIndividualAssessmentsList {
    id:string;
    assessmentId:number;
    title:string;
    category:string;
    questionCount:number;
    status:string;
    assessmentType:string;
}

export interface IDailyLivingActivity {
    id:string;
    title:string;
    goals:Array<string>;
    frequency:string;
    time:string;
    endDate:string;
    comments:{
        createAt:string;
        message:string;
    };
}

export interface IndividualListItemType {
    id:string;
    individualId:number;
    profileImage:string;
    firstname:string;
    lastname:string;
    age:number;
    gender:string;
    medicaidNumber:string;
    compartment:string;
}

export interface NewIndividualType {
    // NEW PERSONAL INFORMATION
    firstname: string,
    middlename: string,
    lastname: string,
    nickname: string,
    dob:string,
    gender: string,
    maritalStatus: string,
    religion: string,
    ssn: string,
    weight: string,
    medicaidNumber: number,
    codeAlert: Array<string>,
    profileImage?:Blob|MediaSource,
    contact: {
        name: string,
        email: string,
        phoneNumber: string
    },
    // NEW HEALTH INFORMATION
    requestedServices: Array<{
        service:string,
        startDate:string
    }>,
    diet: Array<string>,
    allergies: {
        food: Array<string>,
        med: Array<string>,
        other: Array<string>
    },
    compartment:string,
    compartmentId:number;
    subCompartmentId:string;
}

export interface IndividualProfileResponseType {
    _id:string,
    active:boolean,
    // ACCOUNT INFO
    role:'INDIVIDUAL',
    createdAt:string,
    // PERSONAL INFORMATION
    firstname:string,
    middlename:string,
    lastname:string,
    nickname:string,
    dob:string,
    gender:string,
    contact: {
        name:string,
        email:string,
        phoneNumber:string
    },
    profileImage:string,
    // DOCUMENTS
    documents:Array<{
        docTitle:string,
        docType:string,
        docDate:string,
        docFileLink:string,
        docFileName:string,
        createdAt:string
    }>,
    religion:string,
    ssn:string,
    weight:number,
    medicaidNumber:number,
    maritalStatus:string,
    codeAlert:Array<string>
    compartment:string,
    requestedServices: Array<{
        service:string,
        startDate:string
    }>,
    diet: Array<string>,
    allergies: {
        food: Array<string>,
        med: Array<string>,
        other: Array<string>
    }
}

export interface IndividualProfileType {
    id: string,
    personalInformation: {
        profileImage: string,
        firstName: string,
        middleName: string,
        lastName: string,
        nickName: string,
        dob: string,
        gender: string,
        maritalStatus: string,
        religion: string,
        ssn: string,
        weight: number,
        contact: {
            name: string,
            email: string,
            phoneNumber: string
        },
        medicaidNumber: number,
        compartment: string
    },
    healthInformation: {
        diet: Array<string>,
        allergies: {
            food: Array<string>,
            meds: Array<string>,
            others: Array<string>
        }
    }
}

export interface IndividualServiceListItemType {
    id:string;
    serviceId:number;
    title:string;
    refName:string;
    category:string;
    startDate:string;
    time:string;
    frequency:string;
    // createdAt:string
}

export interface IIndividualMedicationsListItem {
    id:string;
    active:boolean;
    medicationId:number;
    barcode:string;
    name:string;
    category:string;
    strength:string;
    amount:{
        current:number;
        allocated:number;
        administered:number;
    },
    frequency:string;
    time:string;
}

export interface IIndividualAssessmentSession {
    id:string;
    assessmentId:string;
    title:string;
    status:string;
    createdAt:string;
    questions:Array<IIndividualAssessmentSessionQuestion>
}

export interface IIndividualAssessmentSessionQuestion {
    id:string;
    question:string;
    category:string;
    answer:string;
    comment:string;
}

export interface IGoalService {
    id:string;
    objective:string;
    method:string;
    frequency:string;
    time:string;
    endDate:string;
    comments:{
        createAt:string;
        message:string;
    };
}

export interface ISupervisoryMedicationReviews {
    id:string;
    month:number;
    signedBy:{
        firstname:string;
        lastname:string;
        profilePicture:string;
    },
    reviewedAt:Date
}
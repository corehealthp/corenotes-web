import { initStateType } from "../types";
import { staffListType } from "./actions";
import { staffActivityType } from "./utils/formatStaffActivities";

export interface IUser {
    createdAt: string;
    id: string,
    active: boolean,
    // ACCOUNT INFO
    role: {
        title:string,
        privileges:{
            staff_profile_view:boolean;
            staff_registration:boolean;
            staff_document_upload:boolean;
        }
    },
    lastSeen: string,
    isClockedIn:boolean;
    
    // PERSONAL INFORMATION
    firstname: string,
    lastname: string,
    nickname: string,
    initials: string,
    dob:string,
    gender: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phoneNumber: {
        work: string,
        cell: string,
        other: string
    },
    emergencyContact: {
        name: string,
        relationship: string,
        phoneNumber: string
    },
    email: string,
    profileImage: string,
    
    // WORK INFORMATION
    compartment: string,
    title: string,
    providerRole: string,
    hiredAt: string,
    username: string,
    employeeId: string,
    jobSchedule: string,
    documents: Array<{
        _id:string,
        docTitle: string,
        docType: string,
        docDate: string,
        docFileLink: string,
        docFileName: string,
        createdAt:string
    }>|[],
    activities: Array<{
        _id:string,
        activityHost:string,
        activityTitle:string,
        activityDateTime:string
    }>
}

export interface IStaffUser {
    createdAt: string;
    id: string,
    active: boolean,
    // ACCOUNT INFO
    role:{
        title:string,
        privileges:{
            staff_profile_view:boolean;
            staff_registration:boolean;
            staff_document_upload:boolean;
        }
    },
    lastSeen: string,
    isClockedIn: boolean;
    
    // PERSONAL INFORMATION
    firstname: string,
    lastname: string,
    nickname: string,
    initials: string,
    dob:string,
    gender: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phoneNumber: {
        work: string,
        cell: string,
        other: string
    },
    emergencyContact: {
        name: string,
        relationship: string,
        phoneNumber: string
    },
    email: string,
    profileImage: string,
    
    // WORK INFORMATION
    compartment: string,
    title: string,
    providerRole: string,
    hiredAt: string,
    username: string,
    employeeId: string,
    jobSchedule: string,
    documents: Array<{
        _id:string,
        docTitle: string,
        docType: string,
        docDate: string,
        docFileLink: string,
        docFileName: string,
        createdAt:string
    }>|[],
    activities: Array<{
        _id:string,
        activityHost:string,
        activityTitle:string,
        activityDateTime:string
    }>
}

export interface IStaffDocument {
    id:string,
    docTitle: string,
    docType: string,
    docDate: string,
    docFileLink: string,
    docFileName: string,
    createdAt:string
}

export interface IStaffDetails {
	id: string;
    _id:string;
	// ACCOUNT INFO
	role: {
		title: string;
		privileges: {
			staff_profile_view: boolean;
			staff_registration: boolean;
			staff_document_upload: boolean;
		};
	};
	active: boolean;
	lastSeen: string;

	// PERSONAL INFORMATION
	personal: {
		firstname: string;
		lastname: string;
		nickname: string;
		initials: string;
		dob: string;
		gender: string;
		address: string;
		city: string;
		state: string;
		zipCode: string;
		phoneNumber: {
			work: string;
			cell: string;
		};
		emergencyContact: {
			name: string;
			relationship: string;
			phoneNumber: string;
		};
		email: string;
		profileImage: string;
	};

	work: {
		// WORK INFORMATION
		providerRole: string;
		hiredAt: string;
		username: string;
		employeeId: string;
		jobSchedule: string;
	};
}

export interface NewStaffType {
    personal:INewStaffPersonalInformation;
    work:INewStaffWorkInformation;
}

export interface INewStaffPersonalInformation {
    firstname:string;
    lastname:string;
    nickname:string;
    initials:string;
    dob:string;
    gender:string;
    address:string;
    city:string;
    state:string;
    zipCode:string;
    phoneNumber: {
        work:string;
        cell:string;
    },
    email:string;
    emergencyContact: {
        name:string;
        relationship:string;
        phoneNumber:string;
    },
}

export interface INewStaffWorkInformation {
    providerRole:string;
    hiredAt:string;
    jobSchedule:string;
    username:string;
    password:string;
}

export interface staffStateType extends initStateType {
    currentPage:number,
    totalPages:number,
    totalStaffs:number;
    list:staffListType[],
    details: IStaffDetails,
    currentActivitiesPage?: number,
    totalActivitiesPage?: number,
    activities: staffActivityType[],
    activityType?: string
    newStaff: NewStaffType,
    roles:{
        currentPage:number,
        totalPages:number,
        list:IStaffRole[]
    },
    roleDetails:IStaffRoleDetails,
    documents:{
        list:Array<IStaffDocument>;
        currentPage:number;
        totalPages:number;
    },
    shifts:{
        list:Array<IStaffShift>;
        currentPage:number;
        totalPages:number;
    }
}

export interface IActivity {
    _id: string,
    title:string,
    dateTime: {
        startDateTime: string,
        endDateTime: string
    },
    host:string,
    assignees: Array<string>,
    category: string,
    status: string,
    createdAt: string
}

export interface IStaffRole {
    id:string;
    title:string;
    staffCount:number;
}

export interface IStaffRoleDetails {
    id:string;
    title:string;
    privileges:{
        staff_profile_view:boolean;
        staff_registration:boolean;
        staff_document_upload:boolean;
    };
}

export interface IStaffShift {
    id:string;
    date:string;
    startTime:string;
    endTime:string;
}
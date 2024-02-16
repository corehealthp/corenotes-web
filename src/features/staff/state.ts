import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { staffStateType } from "./types";
import { ReactNode } from "react";

export const staffInitState:staffStateType = {
	status: "IDLE",
	error: false,
	clockIn: false,
	message: "",
	list: [],
	currentPage: 1,
	totalPages: 1,
	details: {
		// ACCOUNT INFO
		_id: "",
		id: "",
		active: true,
		lastSeen: "",
		isClockedIn: false,


		// PERSONAL INFORMATION
		personal: {
			firstname: "",
			lastname: "",
			nickname: "",
			initials: "",
			dob: "",
			gender: "",
			address: "",
			city: "",
			state: "",
			zipCode: "",
			phoneNumber: {
				work: "",
				cell: "",
			},
			emergencyContact: {
				name: "",
				relationship: "",
				phoneNumber: "",
			},
			email: "",
			profileImage: "",
		},
		// WORK INFORMATION
		work: {
			providerRole: "",
			hiredAt: "",
			username: "",
			jobSchedule: "",
			employeeId: ""
		},
		role: {
			title: "",
			privileges: {
				staff_profile_view: false,
				staff_registration: false,
				staff_document_upload: false,
			},
		},
		lastname: "",
		firstname: "",
		profileImage: "",
		email: undefined,
		emergencyContact: undefined,
		phoneNumber: undefined,
		gender: undefined,
		address: undefined,
		dob: undefined,
		initials: undefined,
		hiredAt: undefined,
		jobSchedule: undefined,
		employeeId: undefined,
		username: undefined,
		providerRole: undefined
	},
	documents: {
		list: [],
		currentPage: 1,
		totalPages: 1,
	},
	currentActivitiesPage: 1,
	totalActivitiesPage: 1,
	activities: [],
	newStaff: {
		personal: {
			firstname: "",
			lastname: "",
			nickname: "",
			initials: "",
			dob: "",
			gender: "",
			address: "",
			city: "",
			state: "",
			zipCode: "",
			phoneNumber: {
				work: "",
				cell: "",
			},
			email: "",
			emergencyContact: {
				name: "",
				relationship: "",
				phoneNumber: "",
			},
		},
		work: {
			providerRole: "",
			hiredAt: "",
			username: "",
			jobSchedule: "",
			password: "",
		}
	},
	roles: {
		list: [],
		currentPage: 1,
		totalPages: 1,
	},
	roleDetails: {
		id: "",
		title: "",
		privileges: {
			staff_profile_view: false,
			staff_registration: false,
			staff_document_upload: false,
		},
	},
	shifts: {
		list: [],
		currentPage: 1,
		totalPages: 1
	},
	totalStaffs: 0,
	profileImage: "",
	firstname: "",

	lastname: function (lastname: any): ReactNode {
		throw new Error("Function not implemented.");
		console.log(lastname);
	},
	phoneNumber: undefined,
	emergencyContact: undefined,
	providerRole: undefined,
	email: undefined,
	nickname: undefined,
	initials: undefined,
	dob: undefined,
	gender: undefined,
	address: undefined,
	city: undefined,
	state: undefined,
	zipCode: undefined,
	title: undefined,
	hiredAt: undefined,
	employeeId: undefined,
	jobSchedule: undefined
};

export const staffAtom = atom({
    key: 'staffState',
    default: staffInitState  
});

export const useStaffValue = ()=> useRecoilValue(staffAtom);
export const useStaffState = ()=> useRecoilState(staffAtom);
export const useSetStaffState = ()=> useSetRecoilState(staffAtom);
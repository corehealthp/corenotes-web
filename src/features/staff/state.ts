import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { staffStateType } from "./types";

export const staffInitState:staffStateType = {
	status: "IDLE",
	error: false,
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
	totalStaffs: 0
};

export const staffAtom = atom({
    key: 'staffState',
    default: staffInitState  
});

export const useStaffValue = ()=> useRecoilValue(staffAtom);
export const useStaffState = ()=> useRecoilState(staffAtom);
export const useSetStaffState = ()=> useSetRecoilState(staffAtom);
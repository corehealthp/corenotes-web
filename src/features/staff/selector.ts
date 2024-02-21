import { selectorFamily, useRecoilValue } from "recoil";
import {fetchStaffAction, fetchStaffActivitiesAction, fetchStaffActivitiesSuccessResponseType, fetchStaffDocumentsAction, fetchStaffDocumentsSuccessResponseType, fetchStaffListAction, fetchStaffListSuccessResponseType, fetchStaffRolesAction, fetchStaffShiftsAction, fetchStaffSuccessResponseType } from "./actions";
import formatStaff from "./utils/formatStaff";
import { staffInitState } from "./state";
import formatStaffActivitiesList from "./utils/formatStaffActivities";
import { IStaffDetails, IStaffRole, IStaffShift, staffStateType } from "./types";

interface IFetchStaffList {
    staffs: Pick<fetchStaffListSuccessResponseType, 'data'>['data'];
    code:number;
    message:string;
    error:boolean;
}

const fetchStaffsListSelector = selectorFamily({
    key: 'fetch_staffs_list_selector',
    get: (pageNumber:number)=> async ()=> {
        return await fetchStaffListAction({pageNumber})
        .then((response)=> {
            return {
                staffs: response.data,
                code: 200,
                message: '',
                error: false

            } satisfies IFetchStaffList
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                staffs: {
                    staffs: staffInitState.list,
                    currentPage: staffInitState.currentPage,
                    totalPages: staffInitState.totalPages,
                    total: 0
                }

            } satisfies IFetchStaffList
        })
    }
})
export const useFetchStaffListSelector = (pageNumber:number)=> useRecoilValue(fetchStaffsListSelector(pageNumber))

interface IFetchStaffSelector {
    staff:IStaffDetails
    code:number,
    message:string,
    error: boolean,
}

const fetchStaffSelector = selectorFamily({
    key: 'fetch_staff_selector',
    get: (staffId:string)=> async ()=> {
        return await fetchStaffAction(staffId)
        .then((response:fetchStaffSuccessResponseType)=> {
            return {
                staff: formatStaff(response.data.staff),
                code: response.code,
                message: response.message,
                error: false
                
            } satisfies IFetchStaffSelector
        })
        .catch((error)=> {
            return {
                code: 500,
                error: true,
                message: error.message,
                staff: staffInitState.details

            } satisfies IFetchStaffSelector
        })
    }
})
export const useFetchStaffSelector = (staffId:string)=> useRecoilValue(fetchStaffSelector(staffId))

interface IFetchStaffDocument {
    data:Pick<staffStateType, 'documents'>['documents'];
    code:number;
    message:string;
    error:boolean
}

const fetchStaffDocumentsSelector = selectorFamily({
    key: 'fetch_staff_documents_selector',
    get: ({id, pageNumber}:{id:string, pageNumber:number})=> async ()=> {
        return await fetchStaffDocumentsAction(id, pageNumber)
        .then((response:fetchStaffDocumentsSuccessResponseType)=> {
            return {
                data: response.data,
                code: response.code,
                message: response.message,
                error: false

            } satisfies IFetchStaffDocument
        })
        .catch((error)=> {
            return {
                code: error.code,
                error: true,
                message: error.message,
                data: staffInitState.documents

            } satisfies IFetchStaffDocument
        })
    }
})
export const useFetchStaffDocumentsSelector = (id:string, pageNumber:number)=> useRecoilValue(fetchStaffDocumentsSelector({id, pageNumber}))

const fetchStaffActivities = selectorFamily({
    key:'fetch_staff_activities',
    get: ({id, pageNumber, activityType}:{id:string, pageNumber:number, activityType:string})=> async ()=> {
        return fetchStaffActivitiesAction(id, pageNumber, activityType)
        .then(({data}:fetchStaffActivitiesSuccessResponseType)=> {
            return {
                code: 200,
                error: false,
                message: '',
                activities: formatStaffActivitiesList(data.activities),
                currentPage: data.currentPage,
                totalPages: data.totalPages,
            }
        })
        .catch((error)=> {
            return {
                code: 500,
                error: true,
                message: error.message,
                activities: [],
                currentPage: 0,
                totalPages: 0,
            }
        })
    }
})

export const useFetchStaffActivities = (data:{id:string, pageNumber:number, activityType:string})=> useRecoilValue(fetchStaffActivities(data));

interface IFetchStaffRolesList {
    message:string;
    code:number;
    error:boolean;
    data: {
        currentPage:number;
        totalPages:number;
        staffRoles:Array<IStaffRole>;
    };
}

const fetchStaffRolesSelector = selectorFamily({
    key:'fetch_staff_roles_selector',
    get: ()=> async ()=> {
        return await fetchStaffRolesAction()
        .then((response)=> {
            return {
                message: response.message,
                code: response.code,
                error: false,
                data: response.data

            } satisfies IFetchStaffRolesList
        })
        .catch((error)=> {
            return {
                code: error.statusCode,
                message: error.message,
                error: false,
                data: {
                    ...staffInitState.roles,
                    staffRoles: staffInitState.roles.list
                }
                
            } satisfies IFetchStaffRolesList
        })
    }
})

export const useFetchStaffRoleSelector = () => useRecoilValue(fetchStaffRolesSelector(1))

interface IFetchStaffShiftsList {
    message:string;
    code:number;
    error:boolean;
    data: {
        currentPage:number;
        totalPages:number;
        list:Array<IStaffShift>;
    };
}

const fetchStaffShiftsSelector = selectorFamily({
    key:'fetch_staff_roles_selector',
    get: ({ staffId, pageNumber }:{staffId:number; pageNumber:number})=> async ()=> {
        return await fetchStaffShiftsAction(staffId, pageNumber)
        .then((response)=> {
            return {
                message: response.message,
                code: response.code,
                error: false,
                data: response.data

            } satisfies IFetchStaffShiftsList
        })
        .catch((error)=> {
            return {
                code: error.statusCode,
                message: error.message,
                error: false,
                data: staffInitState.shifts
                
            } satisfies IFetchStaffShiftsList
        })
    }
})

export const useFetchStaffShiftsSelector = (staffId:number, pageNumber:number) => useRecoilValue(fetchStaffShiftsSelector({staffId, pageNumber}))
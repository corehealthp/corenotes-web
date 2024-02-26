import capitalize from "src/utils/capitalize"
import { staffListType } from "../actions"

export interface staffsListType {
    id:string;
    staffId:number;
    profileImage:string;
    fullname:string;
    role:string;
    phoneNumber:string;
    lastSeen:string;
}

export default function formatStaffList(staffs:staffListType[]):staffsListType[] {
    if(!staffs.length) return []

    return staffs.map((staff:staffListType)=> ({
        id: staff.id,
        staffId: staff.staffId,
        profileImage:staff.profileImage,
        fullname: `${capitalize(staff.firstname)}, ${staff.lastname.toUpperCase()}`,
        role: staff.role,
        phoneNumber: staff.phoneNumber,
        lastSeen: staff.lastSeen
    }))
}
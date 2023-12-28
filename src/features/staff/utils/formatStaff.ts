import { IStaffDetails, IStaffUser } from "../types"

export default function formatStaff(staff:IStaffUser):IStaffDetails {
    return {
        ...staff,
        _id:staff.id,
        id: staff.id ?? "",
        active: staff.active,
        role: staff.role,
        lastSeen: staff.lastSeen,
        // PERSONAL INFORMATION
        personal: {
            firstname: staff.firstname,
            lastname: staff.lastname,
            nickname: staff.nickname,
            initials: staff.initials,
            dob:staff.dob,
            gender: staff.gender,
            address: staff.address,
            city: staff.city,
            state: staff.state,
            zipCode: staff.zipCode,
            phoneNumber: {
                work: staff.phoneNumber.work,
                cell: staff.phoneNumber.cell
            },
            emergencyContact: {
                name: staff.emergencyContact.name,
                relationship: staff.emergencyContact.relationship,
                phoneNumber: staff.emergencyContact.phoneNumber
            },
            email: staff.email,
            profileImage: staff.profileImage,
        },
        work: {
            // WORK INFORMATION
            providerRole: staff.providerRole,
            hiredAt: staff.hiredAt,
            username: staff.username,
            jobSchedule: staff.jobSchedule,
            employeeId: staff.employeeId
        },
        // documents:{
        //     list:[],
        //     currentPage:1,
        //     totalPages:1
        // }
    }
}
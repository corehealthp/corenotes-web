import { IndividualProfileResponseType, 
    // IndividualProfileType 
} from "../types";

export default function formatIndividual(individual:IndividualProfileResponseType) {
    return {
        id: individual._id,
        personalInformation: {
            weight:0,
            profileImage: individual.profileImage,
            firstName: individual.firstname,
            middleName: individual.middlename,
            lastName: individual.lastname,
            nickName: individual.nickname,
            dob: individual.dob,
            gender: individual.gender,
            maritalStatus: individual.maritalStatus,
            religion: individual.religion,
            ssn: individual.ssn,
            contact: {
                name: individual.contact.name,
                email: individual.contact.email,
                phoneNumber: individual.contact.phoneNumber
            },
            medicaidNumber: individual.medicaidNumber,
            compartment: individual.compartment
        },
        healthInformation: {
            diet: individual.diet,
            allergies: {
                food: individual.allergies.food,
                meds: individual.allergies.med,
                others: individual.allergies.other
            },            

        }
    }
}
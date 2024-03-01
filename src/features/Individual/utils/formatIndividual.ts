import { IndividualProfileResponseType, IndividualProfileType } from "../types";

export default function formatIndividual(
  individual: IndividualProfileResponseType
): IndividualProfileType {
  return {
    id: individual._id,
    //@ts-ignore
    personalInformation: {
      weight: individual.weight,
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
        phoneNumber: individual.contact.phoneNumber,
      },
      medicaidNumber: individual.medicaidNumber,
      compartment: individual.compartment,
      compartmentId: individual.compartmentId
    },
    healthInformation: {
      diet: individual.diet,
      allergies: {
        food: individual.allergies.food,
        meds: individual.allergies.med,
        others: individual.allergies.other,
      },
    },

    activityLimitations: individual.activityLimitations,
    dischargePlan: individual.dischargePlan,
    expectedDurationOfService: individual.expectedDurationOfService,
    hardOfHearing: individual.hardOfHearing,
    medicallyFrail: individual.medicallyFrail,
    oxygen: individual.oxygen,
    proneToFalling: individual.proneToFalling,
    shortnessOfBreath: individual.shortnessOfBreath,
    seizureActivity: individual.seizureActivity,
    visionLoss: individual.visionLoss,
    weigthBearingLimitation: individual.weigthBearingLimitation,
    incontinentSafety: individual.incontinentSafety,
    daysOfService: individual.daysOfService,
    expectedFrequency: individual.expectedFrequency,
  };
}

import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IndividualStateType } from "./types";

export const individualInitState: IndividualStateType = {
	status: "IDLE",
	error: false,
	message: "",
	individuals: {
		list: [],
		currentListPage: 1,
		totalListPages: 1,
		total: 0
	},
	newIndividual: {
		firstname: "",
		middlename: "",
		lastname: "",
		nickname: "",
		dob: "",
		gender: "",
		// religion: "",
		ssn: "",
		insurance:"",
		insuranceNo:"",
		otherInsuranceNo:"",
		contact: {
			// name: "",
			email: "",
			phoneNumber: "",
		},
		weight: "",
		// insurance_no:"",
		medicaidNumber: "",
		// medicare_no: "",
		// maritalStatus: "",
		codeAlert: [],
		compartment: 0,
		// compartmentId: 0,
		subCompartmentId: "",
		diet: [],
		allergies: {
			food: [],
			med: [],
			other: [],
		},
		requestedServices: [],
		medicallyFrail: {
			options:[]
		},
		specialNeeds: {
			seizureActivity: '',
			blindVisionLoss: '',
			hardHearing: '',
			incontintentSafety: '',
			failingProne: '',
			oxygen: '',
			weightBearingLimitation: '',
			activityLimitation: '',
			shortnessOfBirth: '',

		},
		serviceFrequency: {
			daysAndFrequencyOfService: '',
			dischargePlan: '',
			frequencyOfService: '',
			durationOfService: '',				
		}
	},
	profile: {
		id: "",
		personalInformation: {
			profileImage: "",
			firstName: "",
			middleName: "",
			lastName: "",
			nickName: "",
			dob: "",
			gender: "",
			maritalStatus: "",
			religion: "",
			ssn: "",
			weight: 0,
			contact: {
				name: "",
				email: "",
				phoneNumber: "",
			},
			medicaidNumber: 0,
			compartment: 0,
		},
		healthInformation: {
			diet: [],
			allergies: {
				food: [],
				meds: [],
				others: [],
			},
			// medicallyFrail: {
			// 	options:[]
			// },
			// specialNeeds: {
			// 	seizureActivity: '',
			// 	blindVisionLoss: '',
			// 	hardHearing: '',
			// 	incontintentSafety: '',
			// 	failingProne: '',
			// 	oxygen: '',
			// 	weightBearingLimitation: '',
			// 	activityLimitation: '',
			// 	shortnessOfBirth: '',

			// },
			// serviceFrequency: {
			// 	dayOfDischarge: '',
			// 	dischargePlan: '',
			// 	frequencyOfService: '',
			// 	durationOfService: '',				
			// }
		},
	},
	assessments: {
		list: [],
		currentPage: 1,
		totalPages: 1,
		session: {
			id: "",
			title: "",
			questions: [],
			assessmentId: "",
			status: "PENDING",
			createdAt: "",
		},
	},
	services: [],
	servicesWithTemplate:['medication-administration', 'goal-tracking', 'daily-living-activity', 'behavior-management', 'chore'],
	medications: {
		list: [],
		currentPage: 1,
		totalPages: 1,
	},
	goalServices: {
		list: [],
		currentPage: 1,
		totalPages: 1,
	},
	supervisoryMedicationReviews: {
		medicationId: "",
		lastMonthReviewed: undefined,
		list: [],
		currentPage: 1,
		totalPages: 1,
	},
	dailyLivingActivities: {
		list: [],
		currentPage: 1,
		totalPages: 1,
	},
	behaviorsServices: {
		list: [],
		currentPage: 1,
		totalPages: 1,
	},
	choreServices: {
		list: [],
		currentPage: 1,
		totalPages: 1,
	},
	documents: {
		list: [],
		currentPage: 1,
		totalPages: 1,
	},
};

export const IndividualAtom = atom({
    key: 'individualState',
    default: individualInitState  
});

export const useIndividualStateValue = ()=> useRecoilValue(IndividualAtom);
export const useIndividualState = ()=> useRecoilState(IndividualAtom);
export const useSetIndividualState = ()=> useSetRecoilState(IndividualAtom);
import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./staffpersonalinformationform.module.css";
// import InputField from "src/components/FormComponents/InputField";
// import { useState } from "react";
// import {
//   formFieldType,
//   setFormFieldType,
// } from "src/components/FormComponents/FormWrapper/types";
import SizedBox from "src/components/SizedBox";
import { INewStaffPersonalInformation } from "src/features/staff/types";
// import { emailValid } from "src/utils/emailValidation";
// import { phoneNumberValid } from "src/utils/phoneNumberValidation";

export default function StaffPersonalInformationForm({
  staff,
  setStaff,
//   userState,
//   onModified,
}: {
  staff: any;
  setStaff: any;
  userState?: any;
  onModified: (newStaffDetails: INewStaffPersonalInformation) => void;
}) {
//   const [firstnameModel, setFirstnameModel] = useState<formFieldType>({
//     type: "text",
//     label: "First name",
//     placeholder: "First name",
//     value: staff?.firstname,
//     error: "",
//     validated: false,
//   });

//   const [lastnameModel, setLastnameModel] = useState<formFieldType>({
//     type: "text",
//     label: "Last name",
//     placeholder: "Last name",
//     value: userState?.lastname,
//     error: "",
//     validated: false,
//   });

//   const [nicknameModel, setNicknameModel] = useState<formFieldType>({
//     type: "text",
//     label: "Nick name",
//     placeholder: "Nick name",
//     value: userState?.nickname,
//     error: "",
//     validated: false,
//   });

//   const [dobModel, setdobModel] = useState<formFieldType>({
//     type: "date",
//     label: "Date of birth",
//     placeholder: "Date of birth",
//     value: userState?.dob,
//     error: "",
//     validated: false,
//   });

//   const [genderModel, setGenderModel] = useState<formFieldType>({
//     type: "text",
//     label: "Gender",
//     placeholder: "Gender",
//     value: userState?.gender,
//     error: "",
//     validated: false,
//   });

//   const [homeAddressModel, setHomeAddressModel] = useState<formFieldType>({
//     type: "text",
//     label: "Home address",
//     placeholder: "Home address",
//     value: userState?.address,
//     error: "",
//     validated: false,
//   });

//   const [cityModel, setCityModel] = useState<formFieldType>({
//     type: "text",
//     label: "City",
//     placeholder: "City",
//     value: userState?.city,
//     error: "",
//     validated: false,
//   });

//   const [stateModel, setStateModel] = useState<formFieldType>({
//     type: "text",
//     label: "State",
//     placeholder: "State",
//     value: userState?.state,
//     error: "",
//     validated: false,
//   });

//   const [zipCodeModel, setZipCodeModel] = useState<formFieldType>({
//     type: "text",
//     label: "Zip code",
//     placeholder: "Zip code",
//     value: userState?.zipCode,
//     error: "",
//     validated: false,
//   });

//   const [workPhoneModel, setWorkPhoneModel] = useState<formFieldType>({
//     type: "phone",
//     label: "Work phone",
//     placeholder: "Work phone",
//     value: userState?.phoneNumber?.work,
//     error: "",
//     validated: false,
//   });

//   const [cellPhoneModel, setCellPhoneModel] = useState<formFieldType>({
//     type: "phone",
//     name: "cell-phone",
//     label: "Cell phone",
//     placeholder: "Cell phone",
//     value: userState?.phoneNumber?.cell,
//     error: "",
//     validated: false,
//   });

//   const [emailAddressModel, setEmailAddressModel] = useState<formFieldType>({
//     type: "email",
//     label: "Email Address",
//     placeholder: "Email Address",
//     value: userState?.email,
//     error: "",
//     validated: false,
//   });

//   const [emergencyContactNameModel, setEmergencyContactNameModel] =
//     useState<formFieldType>({
//       type: "text",
//       label: "Contact name",
//       placeholder: "Contact name",
//       value: userState?.emergencyContact?.name,
//       error: "",
//       validated: false,
//     });

//   const [relWithContactModel, setRelWithContactModel] = useState<formFieldType>(
//     {
//       type: "text",
//       label: "Relationship with contact",
//       placeholder: "Relationship with contact",
//       value: userState?.emergencyContact?.relationship,
//       error: "",
//       validated: false,
//     }
//   );

//   const [contactCellPhoneModel, setContactCellPhoneModel] =
//     useState<formFieldType>({
//       type: "phone",
//       label: "Contact cell phone",
//       placeholder: "Contact cell phone",
//       value: userState?.emergencyContact?.phoneNumber,
//       error: "",
//       validated: false,
//     });

//   function setInput(
//     value: string,
//     inputModel: formFieldType,
//     setInputModel: setFormFieldType
//   ) {
//     inputModel.value = value;
//     // validateModel(inputModel);
//     setInputModel({ ...inputModel });

//     submitStaffDetails();
//   }

  // function validateModel(updatedInputModel: formFieldType) {
  // 	if (!["cell-phone", "other-phone"].includes(updatedInputModel.name!)) {
  // 		if (!updatedInputModel.value) {
  // 			updatedInputModel.validated = false;
  // 			updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
  // 			return;
  // 		}
  // 	}

  // 	if (updatedInputModel.type  === "email") {
  // 		if (!emailValid (updatedInputModel.value))  {
  // 			updatedInputModel.validated = false;
  // 			updatedInputModel.error = `Enter a valid email address `;
  // 			return;
  // 		}
  // 	}

  // 	if (updatedInputModel.type  === "phone") {
  // 		if (!phoneNumberValid (updatedInputModel.value))  {
  // 			updatedInputModel.validated = false;
  // 			updatedInputModel.error = `Enter a valid phone number `;
  // 			return;
  // 		}
  // 	}
  // 	updatedInputModel.validated = true;
  // 	updatedInputModel.error = "";
  // 	return;
  // }

//   function submitStaffDetails() {
//     const staffPersonalInfo: INewStaffPersonalInformation = {
//       firstname: firstnameModel.value,
//       lastname: lastnameModel.value,
//       nickname: nicknameModel.value,
//       initials: firstnameModel.value[0] + lastnameModel.value[0],
//       dob: dobModel.value,
//       gender: genderModel.value,
//       address: homeAddressModel.value,
//       city: cityModel.value,
//       state: stateModel.value,
//       zipCode: stateModel.value,
//       phoneNumber: {
//         work: workPhoneModel.value,
//         cell: cellPhoneModel.value,
//       },
//       emergencyContact: {
//         name: emergencyContactNameModel.value,
//         relationship: relWithContactModel.value,
//         phoneNumber: contactCellPhoneModel.value,
//       },
//       email: emailAddressModel.value,
//     };

//     onModified(staffPersonalInfo);
//   }
  console.log("staffstaff", staff);

  return (
    <FormWrapper extraStyles={styles.staff_personal_information_form}>
      <div className={styles.heading}>
        <div className={styles.number_circle}>1</div>
        <div className={styles.text}>Personal information</div>
      </div>

      <div className={styles.form_content}>
        <div className="flex items-center  gap-2">
          <input
            placeholder="Firstname"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.firstname}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                firstname: e.target.value,
              }));
            }}
          />

          <input
            placeholder="Lastname"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.lastname}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                lastname: e.target.value,
              }));

			  setStaff((state: any) => ({
                ...state,
                initials: staff?.firstname.charAt(0) + staff?.lastname.charAt(0),
              }));
            }}
          />

          <input
            placeholder="Nickname"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.nickname}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,    
                  nickname: e.target.value,
              }));
            }}
          />
        </div>

        <div className="flex items-center  gap-2 ">
          <input
            title="Date of Birth"
            type="date"
            className="w-6/12 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.dob}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                  dob: e.target.value,
              }));
            }}
          />

          <input
            placeholder="Gender"
            type="text"
            className="w-6/12 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.gender}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                  gender: e.target.value,
                
              }));
            }}
          />
        </div>

        <div className="flex items-center  gap-2 ">
          <input
            placeholder="Home Address"
            type="text"
            className="w-full border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.address}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                  address: e.target.value
              }));
            }}
          />
        </div>

        <div className="flex items-center  gap-2 ">
          <input
            placeholder="City"
            type="text"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.city}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                  city: e.target.value
              }));
            }}
          />
          <input
            placeholder="State"
            type="text"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.state}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                  state: e.target.value
              }));
            }}
          />
          <input
            placeholder="Zip Code"
            type="text"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.zipCode}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                  zipCode: e.target.value
              }));
            }}
          />
        </div>

        <div className="flex items-center  gap-2 ">
          <input
            placeholder="Work Phone"
            type="text"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.phoneNumber?.work}
            onChange={(e) => {
              setStaff((staff: any) => ({
                ...staff,
                  phoneNumber: {
                    ...staff.phoneNumber,
                    work: e.target.value,
                  },
                
              }));
            }}
          />
          <input
            placeholder="Cell Phone"
            type="text"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.phoneNumber?.cell}
            onChange={(e) => {
               setStaff((staff: any) => ({
                ...staff,
                  phoneNumber: {
                    ...staff.phoneNumber,
                    cell: e.target.value,
                  },
                
              }));
            }}
          />
          <input
            placeholder="Email Address"
            type="text"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.email}
            onChange={(e) => {
              setStaff((state: any) => ({
                ...state,
                  email: e.target.value,
                
              }));
            }}
          />
        </div>

        <SizedBox height="1px" />

        <div className={styles.sub_heading}>Emergency Contact</div>

        <div className="flex items-center  gap-2 ">
          <input
            placeholder="Contact Name"
            type="text"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.emergencyContact?.name}
            onChange={(e) => {
              setStaff((staff: any) => ({
                ...staff,
				emergencyContact: {
                    ...staff.emergencyContact,
                    name: e.target.value,
                  },
                
              }));
            }}
          />
          <input
            placeholder="Relationship with Contact"
            type="text"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.emergencyContact?.relationship}
            onChange={(e) => {
				setStaff((staff: any) => ({
					...staff,
					emergencyContact: {
						...staff.emergencyContact,
						relationship: e.target.value,
					  },
					
				  }));
            }}
          />
          <input
            placeholder="Contact cell Phone"
            type="text"
            className="w-1/3 border border-gray-400 px-3 py-4 outline-none rounded"
            value={staff?.emergencyContact?.phoneNumber}
            onChange={(e) => {
				setStaff((staff: any) => ({
					...staff,
					emergencyContact: {
						...staff.emergencyContact,
						phoneNumber: e.target.value,
					  },
					
				  }));
            }}
          />
        </div>
      </div>
    </FormWrapper>
  );
}

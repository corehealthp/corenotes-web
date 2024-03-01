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

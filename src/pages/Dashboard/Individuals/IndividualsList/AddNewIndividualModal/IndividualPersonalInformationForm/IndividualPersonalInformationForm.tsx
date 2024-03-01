import FormWrapper from "src/components/FormComponents/FormWrapper";
import styles from "./individualpersonalinformationform.module.css";
// import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
// import {
//   formFieldType,
//   setFormFieldType,
// } from "src/components/FormComponents/FormWrapper/types";
// import {
//   DropDownFormData,
//   setDropDownFormData,
// } from "src/components/FormComponents/DropDownField/types";
// import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";

import {
  //   individualInitState,
  useSetIndividualState,
} from "src/features/Individual/state";
import MultiSelectDropDownField from "src/components/FormComponents/DropDownField/MultiSelectDropDownField";
import { MultiSelectDropDownFormData } from "src/components/FormComponents/DropDownField/MultiSelectDropDownField/types";

export default function IndividualPersonalInformationForm({
  userState,
  setIndividuals,
}: {
  userState: any;
  setIndividuals?: any;
}) {
  const setIndividualState = useSetIndividualState();

  const [codeAlertsModel, setCodeAlertsModel] =
    useState<MultiSelectDropDownFormData>({
      label: "Code alerts",
      placeholder: "Code alerts",
      options: ["DNR", "CPR", "Seizure"],
      error: "",
      value: [],
      validated: false,
    });

  function submit() {
    setIndividualState((state:any) => {
      return {
        ...state,
        newIndividual: {
          ...state.newIndividual!,
          // firstname: firstnameModel.value,
          // middlename: middlenameModel.value,
          // lastname: lastnameModel.value,
          // nickname: nicknameModel.value,
          // dob: dobModel.value,
          // gender: genderModel.value?.value ?? "",
          // ssn: ssnModel.value,
          // weight: weightModel.value.toString(),
          // medicareNo: medicareNumberModel.value,
          // medicaidNumber: medicaidNumberModel.value,
          // insuranceNo: othersNumberModel.value,
          codeAlert: codeAlertsModel.value,
        },
      };
    });
  }

  return (
    <FormWrapper extraStyles={styles.staff_personal_information_form}>
      <div className={styles.heading}>
        <div className={styles.number_circle}>1</div>
        <div className={styles.text}>Personal information</div>
      </div>

      <div className={styles.form_content}>
        <div className={styles.row}>
          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="text"
            placeholder="frst name"
            value={userState?.firstName}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                firstName: e.target.value,
              }));
            }}
            
          />

          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="text"
            placeholder="middle name"
            value={userState?.middleName}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                middleName: e.target.value,
              }));
            }}
          />

          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="text"
            placeholder="lastname"
            value={userState?.lastName}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                lastName: e.target.value,
              }));
            }}
          />
        </div>
        <div className={styles.row}>
          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="text"
            placeholder="nickname"
            value={userState?.nickName}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                nickName: e.target.value,
              }));
            }}
          />

          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="date"
            title="Date of Birth"
            value={userState?.dob}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                dob: e.target.value,
              }));
            }}
          />

          <div className="px-2 w-full border  border-gray-500 rounded-md">
            <select
              className="w-full py-4 outline-none "
              onChange={(e) => {
                setIndividuals((state: any) => ({
                  ...state,
                  gender: e.target.value,
                }));
              }}
            >
              <option value={userState?.gender || ""}>
                {userState?.personalInfomation?.gender || "Gender"}
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="number"
            placeholder="SSN"
            value={userState?.ssn}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                ssn: e.target.value,
              }));
            }}
          />

          <MultiSelectDropDownField
            placeholder={codeAlertsModel.placeholder}
            options={codeAlertsModel.options}
            error={codeAlertsModel.error}
            label={""}
            onSelect={(selectedValues: Array<string>) => {
              setCodeAlertsModel((state:any) => ({
                ...state,
                value: selectedValues,
              }));
              submit();
            }}
          />

          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            placeholder="weight"
            value={userState?.weight}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                weight: e.target.value,
              }));
            }}
          />
        </div>
        <div
          style={{
            margin: "10px 0px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div className={styles.number_circle}>2</div>
          <div className={styles.text}>Insurance</div>
        </div>
        <div className={styles.row}>
          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="number"
            placeholder="Medicare ID Number"
            value={userState?.medicareNumber}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                medicareNumber: e.target.value,
              }));
            }}
          />

          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="number"
            placeholder="Medicaid Number"
            value={userState?.medicaidNumber}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                medicaidNumber: e.target.value,
              }));
            }}
          />

          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="number"
            placeholder="Other ID Number"
            value={userState?.otherID}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                otherID: e.target.value,
              }));
            }}
          />
        </div>

        <div className="flex items-center gap-2 my-6 ">
          <div className="border border-black rounded-full w-5 h-5 flex items-center justify-center ">
            <label>3</label>
          </div>
          <label className="text-xl ">
            Contact information (a guardian or relative)
          </label>
        </div>
        <div className={styles.row}>
          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="text"
            placeholder="Full Name"
            value={userState?.contact?.name}
            

            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                contact: {
                  ...state.contact,
                  name: e.target.value,
                },
              }));
            }}
          />

          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="text"
            placeholder="Email Address"
            value={userState?.contact?.email}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                contact: {
                  ...state.contact,
                  email: e.target.value,
                },
              }));
            }}
          />

          <input
            className=" p-4 w-1/3 border border-gray-500 rounded-md"
            type="text"
            placeholder="Cell Phone"
            value={userState?.contact?.phoneNumber}
            onChange={(e) => {
              setIndividuals((state: any) => ({
                ...state,
                contact: {
                  ...state.contact,
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

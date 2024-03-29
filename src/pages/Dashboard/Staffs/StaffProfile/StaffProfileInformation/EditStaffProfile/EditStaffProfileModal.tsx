import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./editstaffprofilemodal.module.css";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import { staffInitState, useSetStaffState } from "src/features/staff/state";
import { useState } from "react";
// import {
//   DropDownFormData,
//   setDropDownFormData,
// } from "src/components/FormComponents/DropDownField/types";
// import { useFetchStaffRoleSelector } from "src/features/staff/selector";
import { updateStaffProfileAction } from "src/features/staff/actions";
import { useParams } from "react-router-dom";
// import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
// import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import {
  INewStaffPersonalInformation,
  INewStaffWorkInformation,
  // INewStaffWorkInformation,
  // INewStaffWorkInformation,
  NewStaffType,
  staffStateType,
} from "src/features/staff/types";
import StaffPersonalInformationForm from "../../../StaffList/AddNewStaffModal/StaffPersonalInformationForm";
import StaffWorkInformationForm from "../../../StaffList/AddNewStaffModal/StaffWorkInformationForm";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";
// import StaffWorkInformationForm from "../../../StaffList/AddNewStaffModal/StaffWorkInformationForm";
// import StaffWorkInformationForm from "../../../StaffList/AddNewStaffModal/StaffWorkInformationForm";
// import StaffWorkInformationForm from "../../../StaffList/AddNewStaffModal/StaffWorkInformationForm";

export default function EditStaffProfileModal({
  staffState,
  closeModal,
}: {
  staffState: staffStateType;
  closeModal: () => void;
}) {
  const setStaffState = useSetStaffState();

  const { staffId } = useParams();

  const [isButtonEnabled, setIsButtonEnabled] = useState(true);

  function validatePersonalForm(newStaffInfo: INewStaffPersonalInformation) {
    const staffInfo: NewStaffType = {
      ...staffState.newStaff,
      personal: newStaffInfo,
    };

    enableButton(staffInfo);
  }

  function validateWorkForm(newStaffInfo: INewStaffWorkInformation) {
    const staffInfo: NewStaffType = {
      ...staffState.newStaff,
      work: newStaffInfo,
    };

    enableButton(staffInfo);
  }

  function enableButton(newStaffInfo: NewStaffType) {
    const message: string = validateForm(newStaffInfo);

    setStaffState((state:any) => ({
      ...state,
      newStaff: newStaffInfo,
    }));
    setIsButtonEnabled(message ? false : true);
  }

  function validateForm(newStaffInfo: NewStaffType) {
    console.log(newStaffInfo);
    if (!newStaffInfo.personal.firstname) {
      return "Firstname field cannot be empty";
    }
    if (!newStaffInfo.personal.lastname) {
      return "Lastname field cannot be empty";
    }
    if (!newStaffInfo.personal.dob) {
      return "Date of birth field cannot be empty";
    }
    if (!newStaffInfo.personal.gender) {
      return "Gender field cannot be empty";
    }
    if (!newStaffInfo.personal.address) {
      return "Address field cannot be empty";
    }
    if (!newStaffInfo.personal.city) {
      return "City field cannot be empty";
    }
    if (!newStaffInfo.personal.state) {
      return "State field cannot be empty";
    }
    if (!newStaffInfo.personal.zipCode) {
      return "Zip code field cannot be empty";
    }
    if (!newStaffInfo.personal.phoneNumber.work) {
      return "Work phone field cannot be empty";
    }
    // if (!newStaffInfo.personal.phoneNumber.cell) {
    // 	return "Cell phone field cannot be empty";
    // }
    if (!newStaffInfo.personal.email) {
      return "Email field cannot be empty";
    }
    // if (!newStaffInfo.personal.emergencyContact.name) {
    // 	return "Emergency Contact name field cannot be empty";
    // }
    // if (!newStaffInfo.personal.emergencyContact.relationship) {
    // 	return "Relationship with emergency contact field cannot be empty";
    // }
    // if (!newStaffInfo.personal.emergencyContact.phoneNumber) {
    // 	return "Emergency Contact phone field cannot be empty";
    // }
    // if (!newStaffInfo.work.jobSchedule) {
    // 	return "Staff schedule type field cannot be empty";
    // }
    // if (!newStaffInfo.work.providerRole) {
    // 	return "Please select a role for new staff";
    // }
    // if (!newStaffInfo.work.hiredAt) {
    // 	return "Hire date field cannot be empty";
    // }
    // if (!newStaffInfo.work.username) {
    //   return "Staff username field cannot be empty";
    // }
    // if (!newStaffInfo.work.password) {
    //   return "Staff password field cannot be empty";
    // }

    return "";
  }

  // const staffRolesResponse = useFetchStaffRoleSelector(staffState.roles.currentPage);

  // const [providerRoleModel, setProviderRoleModel] = useState<DropDownFormData>({
  //   name: "provider-role",
  //   placeholder: "Provider role",
  //   options: [],
  //   selected: false,
  //   selectedOptionIndex: 0,
  //   error: "",
  // });

  // function selectOption(
  //   optionIndex: number,
  //   model: DropDownFormData,
  //   setModel: setDropDownFormData
  // ) {
  //   model.value = model.options[optionIndex];
  //   model.selected = true;
  //   model.selectedOptionIndex = optionIndex;

  //   setModel({ ...model });
  // }

  // useEffect(() => {
  // 	const currentStaffRole = staffRolesResponse.data.staffRoles.findIndex((role) => role?.title === staffState.details.work.providerRole);
  // 	// console.log(currentStaffRole);

  // 	setStaffState((state:any) => ({
  // 		...state,
  // 		status: "IDLE",
  // 		error: staffRolesResponse.error,
  // 		roles: {
  // 			list: staffRolesResponse.data.staffRoles,
  // 			currentPage: staffRolesResponse.data.currentPage,
  // 			totalPages: staffRolesResponse.data.totalPages,
  // 		},
  // 	}));

  // 	setProviderRoleModel((state:any) => ({
  // 		...state,
  // 		options: [
  // 			...staffRolesResponse.data.staffRoles.map((role) => ({
  // 				id: role.id,
  // 				label: role.title,
  // 				value: role.id,
  // 			})),
  // 		],
  // 		selected: currentStaffRole > -1 ? true : false,
  // 		selectedOptionIndex: currentStaffRole > -1 ? currentStaffRole : 0,
  // 	}));
  // }, [setStaffState, staffRolesResponse, staffState.details]);

  // console.log(staffState);

  function submitStaffProfile() {
    const payload = {
      ...staff,
    };

    setStaffState((state:any) => ({
      ...state,
      status: "LOADING",
    }));

    //@ts-ignore
    updateStaffProfileAction(staffId, payload)
      .then((response) => {
        setStaffState((state: any) => ({
          ...state,
          status: "SUCCESS",
          details: response.data.staff,
          message: response.message,
          error: false,
        }));
        createGlobalFeedback("success", response.message);

      })
      .catch((error) => {
        setStaffState((state:any) => ({
          ...state,
          status: "FAILED",
          details: staffInitState.details,
          message: error.message,
          error: false,
        }));
        createGlobalFeedback("error", error.message);

      })
      .finally(() => {

        setTimeout(() => {
          closeModal();
        }, 1500);
      });
  }

  // function resetStaffState() {
  //   setStaffState((state:any) => ({
  //     ...state,
  //     status: "IDLE",
  //     message: "",
  //     error: false,
  //   }));
  // }

  const userState = staffState.details;
  const [staff, setStaff] = useState({
    firstname: userState?.firstname,
    lastname: userState?.lastname,
    nickname: userState?.nickname,
    initials: userState?.initials,
    address: userState?.address,
    city: userState?.city,
    state: userState?.state,
    zipCode: userState?.zipCode,
    phoneNumber: {
      work: userState?.phoneNumber?.work,
      cell: userState?.phoneNumber?.cell,
    },
    emergencyContact: {
      name: userState?.emergencyContact?.name,
      phoneNumber: userState?.emergencyContact?.phoneNumber,
      relationship: userState?.emergencyContact?.relationship,
    },
    email: userState?.email,
    dob: userState?.dob,
    gender: userState?.gender,

    providerRole: userState?.providerRole,
    jobSchedule: userState?.jobSchedule,

    hiredAt: userState?.hiredAt,
    // },
  });

  return (
    <ModalContainer>
      <div className={styles.edit_staff_profile}>
        {/* <FormStateModal
          status={staffState.status}
          error={staffState.error}
          message={staffState.message}
          reset={() => resetStaffState()}
        /> */}

        <div className={styles.header}>
          <div className={styles.title}>Edit Profile</div>
          <IconCancelCircle
            className={styles.icon_cancel}
            onClick={() =>
              staffState.status === "LOADING" ? () => ({}) : closeModal()
            }
          />
        </div>

        <div className={styles.registration_form_section}>
          <StaffPersonalInformationForm
            userState={userState}
            onModified={validatePersonalForm}
            setStaff={setStaff}
            staff={staff}
          />
          <StaffWorkInformationForm
            userState={userState}
            onModified={validateWorkForm}
            setStaff={setStaff}
            staff={staff}
            edit={true}
          />
        </div>
        <br />

        {/* <div className={styles.body}>
          <DropDownField
            placeholder={providerRoleModel.placeholder}
            options={providerRoleModel.options}
            selected={providerRoleModel.selected}
            selectedOptionIndex={providerRoleModel.selectedOptionIndex}
            error={providerRoleModel.error}
            onSelect={(optionIndex: number) =>
              selectOption(optionIndex, providerRoleModel, setProviderRoleModel)
            }
          />
        </div> */}

        <div className={styles.buttons}>
          <PrimaryTextButton
            isLoading={staffState.status === "LOADING"}
            // disabled={!providerRoleModel.selected}
            disabled={!isButtonEnabled}
            backgroundColor={"green"}
            width={"20%"}
            label="Submit"
            clickAction={() => submitStaffProfile()}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

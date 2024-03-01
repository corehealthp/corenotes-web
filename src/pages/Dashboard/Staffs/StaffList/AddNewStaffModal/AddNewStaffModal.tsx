import { Suspense, useState } from "react";
import styles from "./addnewstaffmodal.module.css";
import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import StaffPersonalInformationForm from "./StaffPersonalInformationForm/StaffPersonalInformationForm";
import StaffWorkInformationForm from "./StaffWorkInformationForm";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useStaffState } from "src/features/staff/state";
// import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { registerStaffAction } from "src/features/staff/actions";
import {
  INewStaffPersonalInformation,
  INewStaffWorkInformation,
  NewStaffType,
} from "src/features/staff/types";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function AddNewStaffModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [staffState, setStaffState] = useStaffState();

  const [staff, setStaff] = useState({
    // personal: {
      firstname: "",
      lastname: "",
      nickname: "",
      initials: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: {
        work: "",
        cell: "",
      },
      emergencyContact: {
        name: "",
        phoneNumber: "",
        relationship: "",
      },
      email: "",
      dob: "",
      gender:"",
    // },

    // work: {
      providerRole: "",
      jobSchedule: "",
      username: "",
      password: "",
      hiredAt:"",
    // },
  });

  console.log(staffState);
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
    setIsButtonEnabled(message ? true : true);
  }

  function validateForm(newStaffInfo: NewStaffType) {
    // if (!newStaffInfo.personal.firstname) {
    // 	return "Firstname field cannot be empty";
    // }
    // if (!newStaffInfo.personal.lastname) {
    // 	return "Lastname field cannot be empty";
    // }
    // if (!newStaffInfo.personal.dob) {
    // 	return "Date of birth field cannot be empty";
    // }
    // if (!newStaffInfo.personal.gender) {
    // 	return "Gender field cannot be empty";
    // }
    // if (!newStaffInfo.personal.address) {
    // 	return "Address field cannot be empty";
    // }
    // if (!newStaffInfo.personal.city) {
    // 	return "City field cannot be empty";
    // }
    // if (!newStaffInfo.personal.state) {
    // 	return "State field cannot be empty";
    // }
    // if (!newStaffInfo.personal.zipCode) {
    // 	return "Zip code field cannot be empty";
    // }
    // if (!newStaffInfo.personal.phoneNumber.work) {
    // 	return "Work phone field cannot be empty";
    // }
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
    if (!newStaffInfo.work.username) {
      return "Staff username field cannot be empty";
    }
    if (!newStaffInfo.work.password) {
      return "Staff password field cannot be empty";
    }

    return "";
  }

  // function resetFormStateModel() {
  //   setStaffState((state:any) => {
  //     return {
  //       ...state,
  //       status: "IDLE",
  //       error: false,
  //       message: "",
  //     };
  //   });

  //   closeModal();
  // }

  function registerStaff() {
    const payload = {
      ...staff,
    };

    setStaffState((state:any) => ({
      ...state,
      status: "LOADING",
    }));

    registerStaffAction(payload)
      .then((data) => {
        console.log(data);
        createGlobalFeedback("success", data.message);

        setStaffState((state:any) => ({
          ...state,
          list: data.data.staffs,
          currentPage: data.data.currentPage,
          totalPages: data.data.totalPages,
        }));
        closeModal();
      })

      .catch((error) => createGlobalFeedback("error", error.message))
      .finally(() => setStaffState((state:any) => ({ ...state, status: "IDLE" })));
  }

  function _closeModal() {
    if (staffState.status !== "LOADING") closeModal();
  }

  return (
    <ModalContainer>
      <div>
        {/* <FormStateModal
          status={staffState.status}
          error={staffState.error}
          message={staffState.message}
          reset={() => resetFormStateModel()}
        /> */}

        <div className={styles.top_section}>
          <div className={styles.heading}>Add new staff</div>
          <IconCancelCircle
            className={styles.icon_cancel}
            onClick={() => _closeModal()}
          />
        </div>

        <Suspense fallback={<ComponentLoader />}>
          <div className={styles.registration_form_section}>
            <StaffPersonalInformationForm onModified={validatePersonalForm} setStaff={setStaff} staff={staff} />
            <StaffWorkInformationForm onModified={validateWorkForm} setStaff={setStaff} staff={staff} />
          </div>
        </Suspense>

        <div className={styles.action_buttons}>
          <FadedBackgroundButton
            label={"Cancel"}
            backgroundColor={"var(--blue-accent-faded-100)"}
            labelColor={"var(--blue-accent-100)"}
            width="20%"
            action={() => closeModal()}
          />

          <PrimaryTextButton
            isLoading={staffState.status === "LOADING"}
            disabled={!isButtonEnabled}
            width={"20%"}
            label={"Save"}
            backgroundColor="green"
            clickAction={() => {
              registerStaff();
            }}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

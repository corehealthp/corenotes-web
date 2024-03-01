import { useState } from "react";
import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./addnewindividualmodal.module.css";
import { ReactComponent as IconCancel } from "src/assets/icons/icon-cancel-circle.svg";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import IndividualPersonalInformationForm from "./IndividualPersonalInformationForm";
import IndividualHealthInformationForm from "./IndividualHealthInformationForm";
import {
  individualInitState,
  useIndividualState,
} from "src/features/Individual/state";
import {
  IndividualListResponseType,
  registerIndividualAction,
} from "src/features/Individual/action";
// import SizedBox from "src/components/SizedBox";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";
import IndividualMedicallyFrail from "./IndividualHealthInformationForm/IndividualMedicallyFrail";
import IndividualFunctionalLimitations from "./IndividualHealthInformationForm/IndividualFunctionalLimitations";
import IndividualServiceFrequency from "./IndividualHealthInformationForm/IndividualServiceFrequency";

export default function AddNewIndividualModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [individualState, setIndividualState] = useIndividualState();


  // useEffect(() => {
  //   validateForm();
  // }, [individualState.newIndividual, validateForm]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // function validateForm() {
  //   if (
  //     !individualState.newIndividual.firstname ||
  //     !individualState.newIndividual.lastname ||
  //     !individualState.newIndividual.dob ||
  //     !individualState.newIndividual.gender ||
  //     !individualState.newIndividual.ssn ||
  //     !individualState.newIndividual.contact.name ||
  //     !individualState.newIndividual.contact.email ||
  //     !individualState.newIndividual.contact.phoneNumber ||
  //     !individualState.newIndividual.weight ||
  //     !individualState.newIndividual.compartment ||
  //     // !individualState.newIndividual.subCompartmentId ||
  //     !individualState.newIndividual.insurance ||
  //     !individualState.newIndividual.insurance_no ||
  //     !individualState.newIndividual.maritalStatus ||
  //     !individualState.newIndividual.codeAlert.length ||
  //     !individualState.newIndividual.requestedServices.length ||
  //     !individualState.newIndividual.diet.length ||
  //     !individualState.newIndividual.allergies.food.length ||
  //     !individualState.newIndividual.allergies.med.length ||
  //     !individualState.newIndividual.allergies.other.length
  //   ) {
  //     // setIsFormValid(false);
  //     return false;
  //   } else {
  //     setIsFormValid(true);
  //     return true;
  //   }
  // }

  function resetFormStateModel() {
    setIndividualState((state:any) => ({
      ...state,
      status: "IDLE",
    }));
  }

  const userState = individualState.newIndividual!;
  const [individual, setIndividual] = useState({
    firstName: userState?.firstname,
    nickName: userState?.nickname,
    lastName: userState?.lastname,
    middleName: userState?.middlename,
    gender: userState?.gender,
    medicaidNumber: userState?.medicaidNumber,
    medicareNumber: userState?.medicareNumber,
    otherID: userState?.otherID,
    dob: userState?.dob,
    ssn: userState?.ssn,
    weight: userState?.weight,
    contact: {
      name: userState?.contact?.name,
      phoneNumber: userState?.contact?.phoneNumber,
      email: userState?.contact?.email,
    },
    compartment: userState?.compartment,
    compartmentId: userState?.compartmentId,

    diet: userState?.diet,
    allergies: userState?.allergies,

    activityLimitations: userState?.activityLimitations,
    dischargePlan: userState?.dischargePlan,
    daysOfService: userState?.daysOfService,
    expectedFrequency: userState?.expectedFrequency,
    expectedDurationOfService: userState?.expectedDurationOfService,
    hardOfHearing: userState?.hardOfHearing,
    incontinentSafety: userState?.incontinentSafety,
    medicallyFrail: userState?.medicallyFrail,
    oxygen: userState?.oxygen,
    proneToFalling: userState?.proneToFalling,
    seizureActivity: userState?.seizureActivity,
    shortnessOfBreath: userState?.shortnessOfBreath,
    visionLoss: userState?.visionLoss,
    weigthBearingLimitation: userState?.weigthBearingLimitation,
  });
  function registerIndividual() {
    setIndividualState((state:any) => ({
      ...state,
      status: "LOADING",
      error: false,
      message: "",
    }));

    registerIndividualAction(individual).then((response: IndividualListResponseType) => {
      createGlobalFeedback("success", response?.message);
       
      setIndividualState((state:any) => ({
          ...state,
          status: "SUCCESS",
          message: "New individual added successfully",
          individuals: response.data,
          newIndividual: individualInitState.newIndividual,
          error: false,
        }));
      })
      .catch((error) => createGlobalFeedback("error", error.message))
      .finally(() => {
        setIndividualState((state:any) => ({
          ...state,
          status: "IDLE",
          error: false,
          message: "",
        }));
        setTimeout(() => {
          closeModal();
        }, 800);
      });
    // }
  }

  return (
    <ModalContainer>
      <div className={styles.add_new_staff}>
        <div className={styles.top_section}>
          <div className={styles.heading}>Add new individual</div>
          <IconCancel
            className={styles.icon_cancel}
            onClick={
              individualState.status !== "LOADING"
                ? () => {
                    resetFormStateModel();
                    closeModal();
                  }
                : () => ({})
            }
          />
        </div>

        <div className={styles.registration_form_section}>
          <IndividualPersonalInformationForm
            userState={individual}
            setIndividuals={setIndividual}
          />
          <IndividualMedicallyFrail
            userState={individual}
            setIndividuals={setIndividual}
          />

          <IndividualFunctionalLimitations
            userState={individual}
            setIndividuals={setIndividual}
          />

          <IndividualServiceFrequency
            userState={individual}
            setIndividuals={setIndividual}
          />

          <IndividualHealthInformationForm
            userState={individual}
            setIndividuals={setIndividual}
          />
        </div>

        <div className={styles.action_buttons}>
          <FadedBackgroundButton
            label={"Cancel"}
            backgroundColor={"var(--blue-accent-faded-100)"}
            labelColor={"var(--blue-accent-100)"}
            width="20%"
            action={() => closeModal()}
          />

          <PrimaryTextButton
            disabled={false}
            isLoading={individualState.status === "LOADING"}
            width={"20%"}
            backgroundColor="green"
            label={"Save"}
            clickAction={() => registerIndividual()}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

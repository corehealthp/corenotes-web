import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./editstaffprofilemodal.module.css";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import { staffInitState } from "src/features/staff/state";
import { useState } from "react";
// import {
//   DropDownFormData,
//   setDropDownFormData,
// } from "src/components/FormComponents/DropDownField/types";
// import { updateStaffProfileAction } from "src/features/staff/actions";
import { useParams } from "react-router-dom";
// import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import IndividualPersonalInformationForm from "../../../IndividualsList/AddNewIndividualModal/IndividualPersonalInformationForm";
import IndividualHealthInformationForm from "../../../IndividualsList/AddNewIndividualModal/IndividualHealthInformationForm";
import { useIndividualState } from "src/features/Individual/state";
// import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import IndividualMedicallyFrail from "../../../IndividualsList/AddNewIndividualModal/IndividualHealthInformationForm/IndividualMedicallyFrail";
import IndividualFunctionalLimitations from "../../../IndividualsList/AddNewIndividualModal/IndividualHealthInformationForm/IndividualFunctionalLimitations";
import IndividualServiceFrequency from "../../../IndividualsList/AddNewIndividualModal/IndividualHealthInformationForm/IndividualServiceFrequency";
import { updateIndividualProfileAction } from "src/features/Individual/action";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function EditStaffProfileModal({
  closeModal,
}: // userState,
{
  closeModal: () => void;
  // userState: object;
}) {
  const [individualState, setIndividualState] = useIndividualState();

  const { individualId } = useParams();

  // const staffRolesResponse = useFetchStaffRoleSelector(
  // 	staffState.roles.currentPage
  // );

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

 
  const userState = individualState.profile;

  function submitIndividualProfile() {
    const payload = {

      //@ts-ignore
      personalInformation: {
        weight: individuals.weight,
        firstName: individuals.firstName,
        middleName: individuals.middleName,
        lastName: individuals.lastName,
        nickName: individuals.nickName,
        dob: individuals.dob,
        gender: individuals.gender,
        ssn: individuals.ssn,
        contact: {
          name: individuals.contact.name,
          email: individuals.contact.email,
          phoneNumber: individuals.contact.phoneNumber,
        },
        medicaidNumber: individuals.medicaidNumber,
        compartment: individuals.compartment,
        compartmentId: individuals.compartmentId
      },
      healthInformation: {
        diet: individuals.diet,
        allergies: {
          food: individuals.allergies.food,
          meds: individuals.allergies.meds,
          others: individuals.allergies.others,
        },
      },
  
      activityLimitations: individuals.activityLimitations,
      dischargePlan: individuals.dischargePlan,
      expectedDurationOfService: individuals.expectedDurationOfService,
      hardOfHearing: individuals.hardOfHearing,
      medicallyFrail: individuals.medicallyFrail,
      oxygen: individuals.oxygen,
      proneToFalling: individuals.proneToFalling,
      shortnessOfBreath: individuals.shortnessOfBreath,
      seizureActivity: individuals.seizureActivity,
      visionLoss: individuals.visionLoss,
      weigthBearingLimitation: individuals.weigthBearingLimitation,
      incontinentSafety: individuals.incontinentSafety,
      daysOfService: individuals.daysOfService,
      expectedFrequency: individuals.expectedFrequency,
      individualId,
    };

    setIndividualState((state:any) => ({
      ...state,
      status: "LOADING",
    }));
    //@ts-ignore
    updateIndividualProfileAction(individualId!, payload)
      .then((response) => {
        setIndividualState((state:any) => ({
          ...state,
          status: "SUCCESS",
          profile: response.data.individual,
          message: response.message,
          error: false,
        }));

        setTimeout(()=>{
          closeModal()
        },2000)
        createGlobalFeedback("success", response.message);

      })
      .catch((error) => {
        setIndividualState((state:any) => ({
          ...state,
          status: "FAILED",
          details: staffInitState.details,
          message: error.message,
          error: false,
        }));
        createGlobalFeedback("error", error.message)


      });
  }

  // function resetStaffState() {
  //   setIndividualState((state:any) => ({
  //     ...state,
  //     status: "IDLE",
  //     message: "",
  //     error: false,
  //   }));
  // }
 
  const [individuals, setIndividuals] = useState({
    
      firstName: userState?.personalInformation?.firstName,
      nickName: userState?.personalInformation?.nickName,
      lastName: userState?.personalInformation?.lastName,
      middleName: userState?.personalInformation?.middleName,
      gender: userState?.personalInformation?.gender,
      medicaidNumber: userState?.personalInformation?.medicaidNumber,
      medicareNumber: userState?.personalInformation?.medicareNumber,
      otherID: userState?.personalInformation?.otherID,
      dob: userState?.personalInformation?.dob,
      ssn: userState?.personalInformation?.ssn,
      weight: userState?.personalInformation?.weight,
      contact: {
        name: userState?.personalInformation?.contact?.name,
        phoneNumber: userState?.personalInformation?.contact?.phoneNumber,
        email: userState?.personalInformation?.contact?.email,
      },
      compartment: userState?.personalInformation?.compartment,
      compartmentId: userState?.personalInformation?.compartmentId,
    
      diet: userState?.healthInformation?.diet,
      allergies: userState?.healthInformation?.allergies,
    

    activityLimitations: userState?.activityLimitations,
    dischargePlan: userState?.dischargePlan,
    daysOfService: userState?.daysOfService,
    expectedFrequency: userState?.expectedFrequency,
    expectedDurationOfService: userState?.expectedDurationOfService,
    hardOfHearing: userState?.hardOfHearing,
    incontinentSafety: userState?.incontinentSafety,
    id: userState?.id,
    medicallyFrail: userState?.medicallyFrail,
    oxygen: userState?.oxygen,
    proneToFalling: userState?.proneToFalling,
    seizureActivity: userState?.seizureActivity,
    shortnessOfBreath: userState?.shortnessOfBreath,
    visionLoss: userState?.visionLoss,
    weigthBearingLimitation: userState?.weigthBearingLimitation,
  });

  return (
    <ModalContainer>
      <div className={styles.edit_staff_profile}>
      

        <div className={styles.header}>
          <div className={styles.title}>Edit Profile</div>
          <IconCancelCircle
            className={styles.icon_cancel}
            onClick={() =>
              individualState.status === "LOADING" ? () => ({}) : closeModal()
            }
          />
        </div>

        <div className={styles.registration_form_section}>
          <IndividualPersonalInformationForm
            userState={individuals}
            setIndividuals={setIndividuals}
          />
          <IndividualMedicallyFrail
            userState={individuals}
            setIndividuals={setIndividuals}
          />
          <IndividualFunctionalLimitations
            userState={individuals}
            setIndividuals={setIndividuals}
          />
          <IndividualServiceFrequency
            userState={individuals}
            setIndividuals={setIndividuals}
          />
          <IndividualHealthInformationForm
            userState={individuals}
            setIndividuals={setIndividuals}
          />
        </div>

        <div className={styles.buttons}>
          <PrimaryTextButton
            isLoading={individualState.status === "LOADING"}
            disabled={false}
            width={"20%"}
            label="Submit"
            backgroundColor="green"
            clickAction={() => submitIndividualProfile()}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

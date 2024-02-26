import styles from "./addmedicationmodal.module.css";
import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useEffect, useState } from "react";
import {
  formFieldType,
  setFormFieldType,
} from "src/components/FormComponents/FormWrapper/types";
import {
  DropDownFormData,
  setDropDownFormData,
} from "src/components/FormComponents/DropDownField/types";
import {
  MultiSelectDropDownFormData,
  setMultiSelectDropDownFormData,
} from "src/components/FormComponents/DropDownField/MultiSelectDropDownField/types";
import RowContainer from "src/components/Layout/RowContainer";
import InputField from "src/components/FormComponents/InputField";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import TagInputField from "src/components/FormComponents/InputField/TagInputField/TagInputField";
import MultiSelectDropDownField from "src/components/FormComponents/DropDownField/MultiSelectDropDownField";
import TextField from "src/components/FormComponents/TextField";
import { INewMedication } from "src/features/medication/types";
import {
  medicationInitState,
  useMedicationState,
} from "src/features/medication/state";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { useFetchStaffRoleSelector } from "src/features/staff/selector";
import { useStaffState } from "src/features/staff/state";
import { createMedicationAction } from "src/features/medication/action";
import {
  ISetTagsInputFormData,
  ITagsInputFormData,
} from "src/components/FormComponents/InputField/TagInputField/types";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function CreateMedicationModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [medicationState, setMedicationState] = useMedicationState();

  const [staffState, setStaffState] = useStaffState();
  const staffRolesResponse = useFetchStaffRoleSelector(staffState.currentPage);

  useEffect(() => {
    setStaffState((state) => ({
      ...state,
      roles: {
        list: staffRolesResponse.data.staffRoles,
        currentPage: staffRolesResponse.data.currentPage,
        totalPages: staffRolesResponse.data.totalPages,
      },
    }));

    setMedProvidersModel((state) => ({
      ...state,
      options: staffState.roles.list.map((role) => role.title),
    }));
  }, [setStaffState, staffRolesResponse, staffState.roles.list]);

  const [medNameModel, setMedNameModel] = useState<formFieldType>({
    placeholder: "Name",
    value: "",
    error: "",
    validated: false,
  });

  const [medStrengthModel, setMedStrengthModel] = useState<formFieldType>({
    placeholder: "Strength",
    value: "",
    error: "",
    validated: false,
  });

  const [medRouteModel, setMedRouteModel] = useState<DropDownFormData>({
    name: "med-route",
    placeholder: "Route",
    options: [
      {
        id: "0",
        label: "None",
        value: "none",
      },
      {
        id: "1",
        label: "Alternating nostrils",
        value: "alternating nostrils",
      },
      {
        id: "2",
        label: "Between the gum and the cheek",
        value: "between the gum and the cheek",
      },
      {
        id: "2",
        label: "Both ears",
        value: "both ears",
      },
      {
        id: "3",
        label: "Both eye lids",
        value: "both eye lids",
      },
      {
        id: "4",
        label: "Both eyes",
        value: "both eyes",
      },
      {
        id: "5",
        label: "Both nostrils",
        value: "both nostrils",
      },
      {
        id: "6",
        label: "By mouth",
        value: "by mouth",
      },
      {
        id: "8",
        label: "By mouth (not from dosage box)",
        value: "by mouth (not from dosage box)",
      },
      {
        id: "9",
        label: "Finger stick",
        value: "finger stick",
      },
      {
        id: "10",
        label: "Inhalant by mouth",
        value: "inhalant by mouth",
      },
      {
        id: "11",
        label: "Intramuscular",
        value: "instramuscular",
      },
      {
        id: "12",
        label: "Intravenous",
        value: "intravenous",
      },
      {
        id: "13",
        label: "J Tube",
        value: "j tube",
      },
      {
        id: "14",
        label: "Left ear",
        value: "left ear",
      },
      {
        id: "15",
        label: "Left nostril",
        value: "left nostril",
      },
      {
        id: "16",
        label: "Nebulizer",
        value: "nebulizer",
      },
      {
        id: "17",
        label: "Nose, mouth or both",
        value: "nose, mouth or both",
      },
      {
        id: "18",
        label: "PEG tube",
        value: "peg tube",
      },
      {
        id: "19",
        label: "Per Nasal Canal",
        value: "per nasal canal",
      },
      {
        id: "21",
        label: "Pump",
        value: "pump",
      },
      {
        id: "22",
        label: "Rectal",
        value: "rectal",
      },
      {
        id: "23",
        label: "Right ear",
        value: "right ear",
      },
      {
        id: "24",
        label: "Right eye",
        value: "right eye",
      },
      {
        id: "25",
        label: "Right nostril",
        value: "right nostril",
      },
      {
        id: "26",
        label: "Subcutaneous",
        value: "subcutaneous",
      },
      {
        id: "27",
        label: "Topical",
        value: "topical",
      },
      {
        id: "28",
        label: "Transdermal",
        value: "transdermal",
      },
      {
        id: "29",
        label: "Under tongue",
        value: "under tongue",
      },
      {
        id: "30",
        label: "Unspecified",
        value: "unspecified",
      },
      {
        id: "31",
        label: "Vaginally",
        value: "vaginally",
      },
      {
        id: "32",
        label: "Vials",
        value: "vials",
      },
    ],
    selected: false,
    selectedOptionIndex: 0,
    error: "",
  });

  const [medTypeModel, setMedTypeModel] = useState<DropDownFormData>({
    name: "med-type",
    placeholder: "Type",
    options: [
      {
        id: "1",
        label: "Scheduled",
        value: "scheduled",
      },
      {
        id: "2",
        label: "PRN",
        value: "PRN",
      },
    ],
    selected: false,
    selectedOptionIndex: 0,
    error: "",
  });

  const [medIndicationsModel, setMedIndicationsModel] =
    useState<ITagsInputFormData>({
      name: "med-indications",
      placeholder: "Indications",
      value: [],
      error: "",
      validated: false,
    });

  const [medProvidersModel, setMedProvidersModel] =
    useState<MultiSelectDropDownFormData>({
      placeholder: "Providers",
      options: [],
      value: [],
      error: "",
      validated: false,
    });

  const [medCategoryModel, setCategoryModel] = useState<DropDownFormData>({
    name: "med-category",
    placeholder: "Category",
    options: [
      {
        id: "1",
        label: "Standard",
        value: "standard",
      },
      {
        id: "2",
        label: "Controlled",
        value: "controlled",
      },
      {
        id: "3",
        label: "Psychotropic",
        value: "psychotropic",
      },
    ],
    selected: false,
    selectedOptionIndex: 0,
    error: "",
  });

  const [medInstructionsModel, setMedInstructionsModel] =
    useState<formFieldType>({
      placeholder: "Medication instructions",
      value: "",
      error: "",
      validated: false,
    });

  const [medPharmarcyModel, setMedPharmachyModel] = useState<formFieldType>({
    placeholder: "Pharmacy",
    value: "",
    error: "",
    validated: false,
  });

  const [medPrescriberModel, setMedPrescriberModel] = useState<formFieldType>({
    placeholder: "Prescriber",
    value: "",
    error: "",
    validated: false,
  });

  const [isFormValidated, setIsFormValidated] = useState(false);

  function validateForm() {
    if (!validateInputModel(medNameModel)) {
      setIsFormValidated(false);
      return false;
    }
    if (!validateInputModel(medStrengthModel)) {
      setIsFormValidated(false);
      return false;
    }
    if (!validateDropDownModel(medRouteModel)) {
      setIsFormValidated(false);
      return false;
    }
    if (!validateDropDownModel(medTypeModel)) {
      setIsFormValidated(false);
      return false;
    }
    if (!validateInputModel(medIndicationsModel)) {
      setIsFormValidated(false);
      return false;
    }
    if (!validateMultiSelectDropDownModel(medProvidersModel)) {
      setIsFormValidated(false);
      return false;
    }
    if (!validateInputModel(medPharmarcyModel)) {
      setIsFormValidated(false);
      return false;
    }
    if (!validateInputModel(medPrescriberModel)) {
      setIsFormValidated(false);
      return false;
    }
    if (!validateDropDownModel(medCategoryModel)) {
      setIsFormValidated(false);
      return false;
    }

    setIsFormValidated(true);
    return true;
  }

  function enableButton() {
    if (!medNameModel.validated) {
      setIsFormValidated(false);
      return false;
    }
    if (!medStrengthModel.validated) {
      setIsFormValidated(false);
      return false;
    }
    if (!medRouteModel.selected) {
      setIsFormValidated(false);
      return false;
    }
    if (!medTypeModel.selected) {
      setIsFormValidated(false);
      return false;
    }
    if (!medIndicationsModel.validated) {
      setIsFormValidated(false);
      return false;
    }
    if (!medProvidersModel.validated) {
      setIsFormValidated(false);
      return false;
    }
    if (!medPharmarcyModel.validated) {
      setIsFormValidated(false);
      return false;
    }
    if (!medPrescriberModel.validated) {
      setIsFormValidated(false);
      return false;
    }
    if (!medCategoryModel.selected) {
      setIsFormValidated(false);
      return false;
    }

    setIsFormValidated(true);
    return true;
  }

  function setInput(
    value: string,
    model: formFieldType,
    setModel: setFormFieldType
  ) {
    model.value = value;
    validateInputModel(model);

    setModel({ ...model });
    enableButton();
  }

  function setTags(
    value: string[],
    model: ITagsInputFormData,
    setModel: ISetTagsInputFormData
  ) {
    model.value = value;
    validateInputModel(model);

    setModel({ ...model });
    enableButton();
  }

  function selectOption(
    optionIndex: number,
    model: DropDownFormData,
    setModel: setDropDownFormData
  ) {
    model.value = model.options[optionIndex];
    model.selected = true;
    model.selectedOptionIndex = optionIndex;

    setModel({ ...model });
    enableButton();
  }

  function selectMultipleOptions(
    value: string[],
    model: MultiSelectDropDownFormData,
    setModel: setMultiSelectDropDownFormData
  ) {
    model.value = value;
    model.error = "";
    model.validated = true;

    if (!model.value.length) {
      model.error = `${model.placeholder} field cannot be empty`;
      model.validated = false;
    }

    setModel({ ...model });
    enableButton();
  }

  function validateInputModel(model: formFieldType | ITagsInputFormData) {
    if (!model.value) {
      model.error = `${model.placeholder} field cannot be empty`;
      model.validated = false;
      return false;
    }

    model.error = "";
    model.validated = true;
    return true;
  }

  function validateDropDownModel(model: DropDownFormData) {
    if (!model.value?.value) {
      model.error = `${model.placeholder} field cannot be empty`;
      model.selected = false;
      return false;
    }

    model.error = "";
    model.selected = true;
    return true;
  }

  function validateMultiSelectDropDownModel(
    model: MultiSelectDropDownFormData
  ) {
    if (!model.value.length) {
      model.error = `${model.placeholder} field cannot be empty`;
      model.validated = false;
      return false;
    }

    model.error = "";
    model.validated = true;
    return true;
  }

  function submitMedicationModel() {
    if (validateForm()) {
      const payload: INewMedication = {
        name: medNameModel.value!,
        strength: medStrengthModel.value!,
        route: medRouteModel.value!.value!,
        medType: medTypeModel.value!.value!,
        indications: medIndicationsModel.value,
        providers: medProvidersModel.value,
        pharmarcy: medPharmarcyModel.value!,
        prescriber: medPrescriberModel.value!,
        instructions: medInstructionsModel.value!,
        category: medCategoryModel.value!.value!,
      };

      createMedicationAction(payload)
        .then((response) => {
          setMedicationState((state) => ({
            ...state,
            status: "SUCCESS",
            message: response.message,
            error: false,
            medications: response.data,
          }));
          createGlobalFeedback("success", response.message);
        })
        .catch((error) => {
          createGlobalFeedback("error", error.message)
        })
        .finally(() => {
          setMedicationState((state) => ({
            ...state,
            status: "IDLE",
            error: false,
            message: "",
          }));
          
        });

      resetMedicationState();
    }
  }

  function resetMedicationState() {
    setMedicationState((state) => ({
      ...state,
      status: "IDLE",
      message: medicationInitState.message,
      error: false,
    }));
  }

  const includeStrings = ["ADMINISTRATOR", "DSP", "LPN", "RN"];
  const filteredArray = medProvidersModel.options.filter((s) =>
    includeStrings.includes(s)
  );

  return (
    <ModalContainer>
      <div className={styles.create_medication_modal}>
        <FormStateModal
          status={medicationState.status}
          error={medicationState.error}
          message={medicationState.message}
          reset={() => resetMedicationState()}
        />

        <div className={styles.header}>
          <div className={styles.titiel}>Add Medication</div>
          <IconCancelCircle onClick={closeModal} />
        </div>

        <div className={styles.body}>
          <RowContainer alignment={"top"}>
            <InputField
              placeholder={medNameModel.placeholder}
              error={medNameModel.error}
              onInput={(value: string) =>
                setInput(value, medNameModel, setMedNameModel)
              }
            />

            <InputField
              placeholder={medStrengthModel.placeholder}
              error={medStrengthModel.error}
              onInput={(value: string) =>
                setInput(value, medStrengthModel, setMedStrengthModel)
              }
            />

            <DropDownField
              placeholder={medRouteModel.placeholder}
              options={medRouteModel.options}
              selected={medRouteModel.selected}
              selectedOptionIndex={medRouteModel.selectedOptionIndex}
              error={medRouteModel.error}
              onSelect={(optionIndex: number) =>
                selectOption(optionIndex, medRouteModel, setMedRouteModel)
              }
            />
          </RowContainer>

          <RowContainer alignment={"top"}>
            <DropDownField
              placeholder={medTypeModel.placeholder}
              options={medTypeModel.options}
              selected={medTypeModel.selected}
              selectedOptionIndex={medTypeModel.selectedOptionIndex}
              error={medTypeModel.error}
              onSelect={(optionIndex: number) =>
                selectOption(optionIndex, medTypeModel, setMedTypeModel)
              }
            />

            <TagInputField
              label={""}
              placeholder={medIndicationsModel.placeholder!}
              value={medIndicationsModel.value}
              error={medIndicationsModel.error}
              onTagAdded={(value: string[]) =>
                setTags(value, medIndicationsModel, setMedIndicationsModel)
              }
            />

            <MultiSelectDropDownField
              label={""}
              placeholder={medProvidersModel.placeholder}
              options={filteredArray}
              error={medProvidersModel.error}
              onSelect={(selection: string[]) =>
                selectMultipleOptions(
                  selection,
                  medProvidersModel,
                  setMedProvidersModel
                )
              }
            />
          </RowContainer>

          <RowContainer alignment={"top"}>
            <InputField
              type={medPharmarcyModel.type}
              placeholder={medPharmarcyModel.placeholder}
              error={medPharmarcyModel.error}
              value={medPharmarcyModel.value}
              onInput={(value: string) =>
                setInput(value, medPharmarcyModel, setMedPharmachyModel)
              }
            />

            <InputField
              type={medPrescriberModel.type}
              placeholder={medPrescriberModel.placeholder}
              error={medPrescriberModel.error}
              onInput={(value: string) =>
                setInput(value, medPrescriberModel, setMedPrescriberModel)
              }
            />

            <DropDownField
              placeholder={medCategoryModel.placeholder}
              options={medCategoryModel.options}
              selected={medCategoryModel.selected}
              selectedOptionIndex={medCategoryModel.selectedOptionIndex}
              error={medCategoryModel.error}
              onSelect={(optionIndex: number) =>
                selectOption(optionIndex, medCategoryModel, setCategoryModel)
              }
            />
          </RowContainer>

          <TextField
            height="200px"
            placeholder={medInstructionsModel.placeholder}
            onInput={(value: string) =>
              setInput(value, medInstructionsModel, setMedInstructionsModel)
            }
          />
        </div>

        <div className={styles.buttons}>
          <PrimaryTextButton
            isLoading={medicationState.status === "LOADING"}
            disabled={!isFormValidated}
            width={"20%"}
            label="Submit"
            backgroundColor={"var(--green-accent-100)"}
            clickAction={() => submitMedicationModel()}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

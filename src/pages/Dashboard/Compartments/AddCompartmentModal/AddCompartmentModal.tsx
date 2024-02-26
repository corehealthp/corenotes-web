import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./addcompartmentmodal.module.css";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
import {
  formFieldType,
  setFormFieldType,
} from "src/components/FormComponents/FormWrapper/types";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import {
  newCompartmentData,
  postCompartment,
} from "src/features/compartment/action";
import { useCompartmentState } from "src/features/compartment/state";
import ImageUploader from "src/components/ImageUploader";
import { ImageUploaderFormType } from "src/components/ImageUploader/ImageUploader";
import JSONToFormData from "src/utils/JSONToFormData";
import SizedBox from "src/components/SizedBox";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";

export default function AddCompartmentModal({ close }: { close: () => void }) {
  const [compartmentState, setCompartmentState] = useCompartmentState();

  const [compartmentTitle, setCompartmentTitle] = useState<formFieldType>({
    type: "text",
    placeholder: "Enter name of compartment",
    value: "",
    error: "",
    validated: false,
  });

  const [compartmentImage, setCompartmentImage] =
    useState<ImageUploaderFormType>();

  function setInput(
    value: string,
    model: formFieldType,
    setModel: setFormFieldType
  ) {
    model.value = value;
    validateModel(model);
    setModel({ ...model });
  }

  function setImage(imageFile: Blob | MediaSource) {
    setCompartmentImage((state) => {
      return {
        ...state!,
        image: imageFile,
      };
    });
  }

  function validateModel(updatedModel: formFieldType) {
    if (!updatedModel.value) {
      updatedModel.error = "Field cannot be empty";
      updatedModel.validated = false;
      return;
    }

    const isMatch = compartmentState.compartmentsList.filter(
      (compartment) => compartment.title === updatedModel.value?.toLowerCase()
    )[0]?.title;

    if (isMatch) {
      updatedModel.error = "Compartment already exist";
      updatedModel.validated = false;
      return;
    }

    updatedModel.error = "";
    updatedModel.validated = true;
    return;
  }

  function submitAddCompartment() {
    const payload: newCompartmentData = {
      title: compartmentTitle.value!,
      compartmentImage: compartmentImage?.image,
    };

    setCompartmentState((state) => ({
      ...state,
      status: "LOADING",
      error: false,
      message: "",
    }));

    JSONToFormData(payload).then((payloadInFormData) => {
      postCompartment(payloadInFormData)
        .then((response) => {
          setCompartmentState((state) => ({
            ...state,
            status: "SUCCESS",
            error: false,
            message: "New compartment successfully created",
            compartmentsList: response.data.compartments,
            currentListPage: response.data.currentListPage,
            totalListPages: response.data.totalListPages,
          }));

          setTimeout(() => {
            close();
          }, 1000);
        })
        .catch((error) => {
          setCompartmentState((state) => ({
            ...state,
            status: "FAILED",
            error: true,
            message: error.message || "There was an error creating compartment",
          }));
        });
    });
  }

  return (
    <ModalContainer>
      <div className={styles.container}>
        <FormStateModal
          status={compartmentState.status}
          error={compartmentState.error}
          message={compartmentState.message}
          reset={() =>
            setCompartmentState((state) => ({ ...state, status: "IDLE" }))
          }
        />

        <div className={styles.heading}>
          <div className={styles.title}>Compartments</div>
          <IconCancelCircle
            onClick={() => close()}
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className={styles.body}>
          <ImageUploader
            extraStyle={""}
            position={""}
            label={"Compartment image"}
            error={""}
            saveImage={(imageFile: File) => setImage(imageFile)}
            deleteImage={() => ({})}
          />

          <SizedBox height="50px" />

          <InputField
            placeholder={compartmentTitle.placeholder}
            value={compartmentTitle.value}
            error={compartmentTitle.error}
            onInput={(value) =>
              setInput(value, compartmentTitle, setCompartmentTitle)
            }
          />
        </div>

        <div className={styles.buttons}>
          <FadedBackgroundButton
            width="200px"
            label="Cancel"
            labelColor={"var(--blue-accent-200)"}
            backgroundColor={"var(--blue-accent-faded-100)"}
            action={() => close()}
          />

          <PrimaryTextButton
            width="200px"
            label="Create compartment"
            backgroundColor={"var(--green-accent-100)"}
            clickAction={() => submitAddCompartment()}
            backgroundColor="green"
            disabled={!compartmentTitle.validated}
            isLoading={compartmentState.status === "LOADING"}
          />
        </div>
      </div>
    </ModalContainer>
  );
}

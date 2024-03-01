import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import { useEffect, useState } from "react";
import styles from "./assessmentquestion.module.css";
import { useParams } from "react-router-dom";
import { useFetchAssessmentDetailsResponse } from "src/features/assessment/selector";
import { useAssessmentState } from "src/features/assessment/state";
import DataLoadingError from "src/components/DataLoadingError";
import InputField from "src/components/FormComponents/InputField";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";

export default function EditStaffProfileModal({ closeModal }:{ closeModal: () => void }) {
  
  const params = useParams();

  const [assessmentState, setAssessmentState] = useAssessmentState();

  const assessmentDetailsResponse = useFetchAssessmentDetailsResponse(params.assessmentId!);

  useEffect(() => {
    setAssessmentState((state:any) => ({
      ...state,
      error: assessmentDetailsResponse.error,
      assessmentDetails: assessmentDetailsResponse.assessment,
    }));
  }, [assessmentDetailsResponse, setAssessmentState]);

  const [assessmentTitleModal, setAssessmentTitleModal] = useState<formFieldType>({
    type: "text",
    label: "Assessment Title",
    placeholder: "Assessment Title",
    value: assessmentState.assessmentDetails.title,
    error: "",
    validated: false,
  });

  // Compute the initial value outside the useState
  const initialAssessmentQuestionValue = assessmentState.assessmentDetails.questions.map((question) => question.question);

  // Use the initial value in the useState
  const [assessmentQuestionModal, setAssessmentQuestionModal] = useState<formFieldType>({
    type: "text",
    label: "Assessment Question",
    placeholder: "Assessment Question",
    value: initialAssessmentQuestionValue[0],
    error: "",
    validated: false,
  });

  // Use the initial value in the useState
  const initialAssessmentQuestionCategoryValue = assessmentState.assessmentDetails.questions.map((question) => question.category);

  const [assessmentQuestionCategoryModal, setAssessmentQuestionCategoryModal] =
    useState<formFieldType>({
      type: "text",
      label: "Assessment QuestionCategory",
      placeholder: "Assessment QuestionCategory",
      value: initialAssessmentQuestionCategoryValue[0],
      error: "",
      validated: false,
    });

  const [assessmentCategoryModal, setAssessmentCategoryModal] = useState<formFieldType>({
    type: "text",
    label: "Assessment Category",
    placeholder: "Assessment Category",
    value: assessmentState.assessmentDetails.category,
    error: "",
    validated: false,
  });

  function setInput(value: string, inputModel: formFieldType, setInputModel: setFormFieldType) {
    inputModel.value = value;
    validateModel(inputModel);
    setInputModel({ ...inputModel });
  }

  function validateModel(updatedInputModel: formFieldType) {
    if (!updatedInputModel.optional && !updatedInputModel.value) {
      updatedInputModel.validated = false;
      updatedInputModel.error = `${updatedInputModel.label} field cannot be empty`;
      return;
    }

    updatedInputModel.validated = true;
    updatedInputModel.error = "";
    return;
  }
  
  function EditAssementQuestion(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <ModalContainer>
      <div>
        <div>
          {assessmentState.error ? (
            <DataLoadingError message={assessmentState.message} />
          ) : (
            <FormWrapper>
              <div className={styles.header}></div>
              <div className={styles.form_content}>
                <br></br>
                <IconCancelCircle
                  className={styles.icon_cancel}
                  onClick={() => closeModal()}
                />
              </div>
              <div className={styles.form_content}>
                <h2>Edit Assessment</h2>

                <div className={styles.row}>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Edit Title</p>
                    <InputField
                      type={assessmentTitleModal.type}
                      placeholder={assessmentTitleModal.placeholder}
                      value={assessmentTitleModal.value}
                      error={assessmentTitleModal.error}
                      onInput={(inputValue: string) =>
                        setInput(
                          inputValue,
                          assessmentTitleModal,
                          setAssessmentTitleModal
                        )
                      }
                    />
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Edit Category</p>
                    <InputField
                      type={assessmentCategoryModal.type}
                      placeholder={assessmentCategoryModal.placeholder}
                      value={assessmentCategoryModal.value}
                      error={assessmentCategoryModal.error}
                      onInput={(inputValue: string) =>
                        setInput(
                          inputValue,
                          assessmentCategoryModal,
                          setAssessmentCategoryModal
                        )
                      }
                    />
                  </div>
                </div>

                <div className={styles.row}>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Edit Question</p>
                    <InputField
                      type={assessmentQuestionModal.type}
                      placeholder={assessmentQuestionModal.placeholder}
                      value={assessmentQuestionModal.value}
                      error={assessmentQuestionModal.error}
                      onInput={(inputValue: string) =>
                        setInput(
                          inputValue,
                          assessmentQuestionModal,
                          setAssessmentQuestionModal
                        )
                      }
                    />
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>Edit Question Category</p>
                    <InputField
                      type={assessmentQuestionCategoryModal.type}
                      placeholder={assessmentQuestionCategoryModal.placeholder}
                      value={assessmentQuestionCategoryModal.value}
                      error={assessmentQuestionCategoryModal.error}
                      onInput={(inputValue: string) =>
                        setInput(
                          inputValue,
                          assessmentQuestionCategoryModal,
                          setAssessmentQuestionCategoryModal
                        )
                      }
                    />
                  </div>
                </div>

                <div className={styles.buttons}>
                  <PrimaryTextButton
                    width={"50%"}
                    label="Submit"
                    clickAction={() => EditAssementQuestion()}
                  />
                </div>
              </div>
            </FormWrapper>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}

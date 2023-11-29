import ModalContainer from "src/components/Modal/ModalContainer"
import styles from "./uploadassessmentmodal.module.css"
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import { useState } from "react";
import { useAssessmentState } from "src/features/assessment/state";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import DocumentUploader from "src/components/FileComponents/DocumentUploader";
import { formFieldType } from "src/components/FormComponents/FormWrapper/types";
import JSONToFormData from "src/utils/JSONToFormData";
import { uploadAssessmentCSVAction } from "src/features/assessment/action";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function UploadAssessmentModal({closeModal}:{closeModal:()=> void}) {

    const [assessmentState, setAssessmentState] = useAssessmentState();
    
    const [uploadAssessmentCSVState, setUploadAssessmentCSVState] = useState(assessmentState);
    
    const [docFileModel, setDocFileModel] = useState<formFieldType>({
        placeholder:'Document File',
        value:'',
        error:'',
        validated:false
    })
    
    function _closeModal() {
        if (uploadAssessmentCSVState.status !== "LOADING") closeModal();
    }

    function saveFile(file:File, name:string) {
        if(file) {
            setDocFileModel(state => {
                return {
                    ...state,
                    file: file,
                    validated: true
                }
            })
        }
    }

    function uploadAssessmentCSV() {
        const payload = {
            assessmentCSV: docFileModel.file
        }

        setUploadAssessmentCSVState(state => ({ ...state, status:"LOADING" }));

        JSONToFormData(payload)
        .then((payloadFormData)=> {
            uploadAssessmentCSVAction(payloadFormData)
            .then((response)=> {
                setAssessmentState(state => ({ ...state, assessments: response.data }))
                createGlobalFeedback("success", response.message);
            })
            .catch((error)=> createGlobalFeedback("error", error.message))
            .finally(()=> setUploadAssessmentCSVState(state => ({ ...state, status:"IDLE" })));
        })
        .catch((error)=> {
            setUploadAssessmentCSVState(state => ({ ...state, status:"IDLE" }));
            createGlobalFeedback("error", error?.message ?? error);
        })
    }
    
    return  <ModalContainer close={_closeModal}>
                <div>
                    <div className={styles.top_section}>
                        <div className={styles.heading}>Upload Assessment File</div>
                        <IconCancelCircle
                            className={styles.icon_cancel}
                            onClick={_closeModal}
                        />
                    </div>

                    <div className={styles.body}>
                        <DocumentUploader
                            id={"assessment-csv"}
                            fileType={".csv"}
                            saveDoc={({uploadedFile, fileName})=> saveFile(uploadedFile, fileName)}
                        />
                    </div>

                    <div className={styles.action_buttons}>
                        <FadedBackgroundButton
                            label={"Cancel"}
                            backgroundColor={"var(--blue-accent-faded-100)"}
                            labelColor={"var(--blue-accent-100)"}
                            width="20%"
                            action={_closeModal}
                        />

                        <PrimaryTextButton
                            isLoading={uploadAssessmentCSVState.status === "LOADING"}
                            disabled={!docFileModel.validated}
                            width={"20%"}
                            label={"Submit"}
                            clickAction={uploadAssessmentCSV}
                        />
                    </div>
                </div>
            </ModalContainer>
}
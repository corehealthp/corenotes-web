import { useParams } from "react-router-dom";
import styles from "./prnmedicationreviewdetails.module.css"
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import SizedBox from "src/components/SizedBox"
import { resetTaskState, useTaskState } from "src/features/task/state";
import DeleteTextButton from "src/components/Buttons/DeleteTextButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import TextField from "src/components/FormComponents/TextField";
import { useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import { completePRNMedicationReviewTaskAction, declinePRNMedicationReviewTaskAction } from "src/features/task/action";

export default function PRNMedicationReviewDetails() {

    const params = useParams();

    const [taskState, setTaskState] = useTaskState();
    
    const [declineTaskState, setDeclineTaskState] = useState(taskState);

    const [completeTaskState, setCompleteTaskState] = useState(taskState);

    const [notesModel, setNotesModel] = useState<formFieldType>({
        type: "text",
        label: "How effective was this medication?",
        value: "",
        error: "",
        validated: false
    });

    const [isFormValid, setIsFormValid] = useState(false);

    function setInput(value:string, inputModel:formFieldType, setInputModel:setFormFieldType) {
        inputModel.value = value
        validateModel(inputModel)
        setInputModel({...inputModel});

        validateForm()
    }

    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            return
        }

        updatedInputModel.validated = true;
        return
    }

    function validateForm() {
        if(!notesModel.validated) {
            setIsFormValid(false)
            return false;
        }

        setIsFormValid(true)
        return true;
    }

    function completeTask() {
        if(validateForm()) {
            const payload = {
                note: notesModel.value
            }

            setCompleteTaskState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            resetTaskState(setDeclineTaskState)

            completePRNMedicationReviewTaskAction(parseInt(params.taskId!), payload)
            .then((response)=> {
                setCompleteTaskState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error: false,
                    message: response.message,
                }))

                setTaskState(state => ({
                    ...state,
                    taskDetails: response.data.task
                }))
            })
            .catch((error)=> {
                setCompleteTaskState(state => ({
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: error.message
                }))
            })
        }
    }

    function declineTask() {
        if(notesModel.validated) {
            const payload = {
                note: notesModel.value
            }

            setDeclineTaskState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            resetTaskState(setCompleteTaskState)

            declinePRNMedicationReviewTaskAction(parseInt(params.taskId!), payload)
            .then((response)=> {
                setDeclineTaskState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error: false,
                    message: response.message,
                    taskDetails: response.data.task
                }))

                setTaskState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error: false,
                    message: response.message,
                    taskDetails: response.data.task
                }))
            })
            .catch((error)=> {
                setDeclineTaskState(state => ({
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: error.message
                }))
            })
        }
    }

    return (
        <div>
            <FormStateModal 
                status={declineTaskState.status} 
                error={declineTaskState.error} 
                message={declineTaskState.message}
                reset={()=> resetTaskState(setDeclineTaskState)}
            />

            <FormStateModal 
                status={completeTaskState.status} 
                error={completeTaskState.error} 
                message={completeTaskState.message}
                reset={()=> resetTaskState(setCompleteTaskState)}
            />

            <div className={styles.heading}>
                <div className={styles.title}>{ taskState.taskDetails.service.title }</div>
                <div className={styles.task_status}>{ taskState.taskDetails.status }</div>
            </div>

            <SizedBox height="50px" />

            <div className={styles.desc}>
                <div className={styles.label}>Administered for:</div>
                <div className={styles.content} children={taskState.taskDetails.prnMedicationReview!.note} />
            </div>

            <SizedBox height="50px" />

            <FormWrapper extraStyles={styles.form_wrapper}>
                <TextField
                    label={notesModel.label}
                    error={notesModel.error}
                    onInput={(value:string)=> setInput(value, notesModel, setNotesModel)}
                />

                <div className={styles.actions}>
                    <DeleteTextButton
                        label={"Decline"}
                        clickAction={declineTask}
                        isLoading={declineTaskState.status === "LOADING"}
                        disabled={!notesModel.validated}
                    />

                    <PrimaryTextButton
                        label={"Administered"}
                        clickAction={completeTask}
                        isLoading={completeTaskState.status === 'LOADING'}
                        disabled={!isFormValid}
                    />
                </div>
            </FormWrapper>
            <SizedBox height="50px" />
        </div>
    )
}
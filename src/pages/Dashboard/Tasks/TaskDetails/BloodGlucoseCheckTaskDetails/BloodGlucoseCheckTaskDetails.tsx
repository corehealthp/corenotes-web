import { useState } from "react";
import styles from "./bloodglucosechecktaskdetails.module.css";
import { resetTaskState, useTaskState } from "src/features/task/state";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import TextField from "src/components/FormComponents/TextField";
import SizedBox from "src/components/SizedBox";
import DeleteTextButton from "src/components/Buttons/DeleteTextButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useParams } from "react-router-dom";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { completeBloodGlucoseCheckTaskAction, declineBloodGlucoseCheckTaskAction } from "src/features/task/action";

export default function BloodGlucoseCheckTaskDetails() {

    const params = useParams();

    const [taskState, setTaskState] = useTaskState();
    
    const [declineTaskState, setDeclineTaskState] = useState(taskState);

    const [completeTaskState, setCompleteTaskState] = useState(taskState);

    const [notesModel, setNotesModel] = useState<formFieldType>({
        type: "text",
        label: "Note",
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
                individualId: taskState.taskDetails.individual.id,
                note: notesModel.value
            }

            setCompleteTaskState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            completeBloodGlucoseCheckTaskAction(parseInt(params.taskId!), payload)
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
        setDeclineTaskState(state => ({
            ...state,
            status: "LOADING",
            message: "",
            error: false
        }))

        declineBloodGlucoseCheckTaskAction(parseInt(params.taskId!))
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

    return (
        <div className={styles.goal_tracking_task_details}>
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
                <div className={styles.title}>Blood Glucose Check</div>
                <div className={styles.task_status}>{ taskState.taskDetails.status }</div>
            </div>

            <SizedBox height="50px" />

            <div className={styles.instructions}>
                <div className={styles.instructions_title}>Instructions</div>
                <SizedBox height="10px" />
                <div className={styles.instructions_body}>
                    <div>Wear gloves and follow agency procedure, check blood glucose, and record.</div>
                    <div>Notify RN if: If Blood Glucose is less than 70 or greater than 300</div>
                </div>
            </div>

            <SizedBox height="30px" />

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

import styles from "./skinintegritytaskdetails.module.css";
import { resetTaskState, useTaskState } from "src/features/task/state";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import InputField from "src/components/FormComponents/InputField";
import { useState } from "react";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import TextField from "src/components/FormComponents/TextField";
import SizedBox from "src/components/SizedBox";
import DeleteTextButton from "src/components/Buttons/DeleteTextButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useParams } from "react-router-dom";
import { completeSkinIntegrityTaskAction, declineSkinIntegrityTaskAction } from "src/features/task/action";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";

export default function SkinIntegrityTaskDetails() {

    const params = useParams();

    const [taskState, setTaskState] = useTaskState();
    
    const [declineTaskState, setDeclineTaskState] = useState(taskState);

    const [completeTaskState, setCompleteTaskState] = useState(taskState);
    
    const [timeTakenModel, setTimeTakenModel] = useState<formFieldType>({
        type: "number",
        label: "Time taken in minutes",
        value: "",
        error: "",
        validated: false
    });

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
        if(!timeTakenModel.validated) {
            setIsFormValid(false)
            return false;
        }
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
                timeTaken: parseInt(timeTakenModel.value),
                note: notesModel.value
            }

            setCompleteTaskState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            completeSkinIntegrityTaskAction(parseInt(params.taskId!), payload)
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

    function  declineTask() {
        setDeclineTaskState(state => ({
            ...state,
            status: "LOADING",
            message: "",
            error: false
        }))

        declineSkinIntegrityTaskAction(parseInt(params.taskId!))
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
                <div className={styles.title}>Skin Integrity</div>
                <div className={styles.task_status}>{ taskState.taskDetails.status }</div>
            </div>

            <SizedBox height="50px" />

            <FormWrapper extraStyles={styles.form_wrapper}>
                <InputField
                    type={timeTakenModel.type}
                    label={timeTakenModel.label}
                    error={timeTakenModel.error}
                    onInput={(value:string)=> setInput(value, timeTakenModel, setTimeTakenModel)}
                />

                <TextField
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
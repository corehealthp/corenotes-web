import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal"
import styles from "./firedrilltaskdetails.module.css"
import SizedBox from "src/components/SizedBox"
import FormWrapper from "src/components/FormComponents/FormWrapper"
import InputField from "src/components/FormComponents/InputField"
import DeleteTextButton from "src/components/Buttons/DeleteTextButton"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"
import { useParams } from "react-router-dom"
import { resetTaskState, useTaskState } from "src/features/task/state"
import { useState } from "react"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types"
import { completeFireDrillTaskAction, declineFireDrillTaskAction } from "src/features/task/action"
import RowContainer from "src/components/Layout/RowContainer"
import TextField from "src/components/FormComponents/TextField"

export default function FireDrillTaskDetails() {

    const params = useParams();

    const [taskState, setTaskState] = useTaskState();
    
    const [declineTaskState, setDeclineTaskState] = useState(taskState);

    const [completeTaskState, setCompleteTaskState] = useState(taskState);

    const [noOfIndividualsModel, setNoOfIndividualsModel] = useState<formFieldType>({
        type: "number",
        label: "Number of individuals",
        value: "",
        error: "",
        validated: false
    });

    const [lengthOfDrillInMinutesModel, setLengthOfDrillInMinutesModel] = useState<formFieldType>({
        type: "number",
        label: "Length of drill (in minutes)",
        value: "",
        error: "",
        validated: false
    });

    const [fireExtinguisherDateModel, setFireExtinguisherDateModel] = useState<formFieldType>({
        type: "date",
        label: "Fire extinguisher (Date checked)",
        value: "",
        error: "",
        validated: false
    });

    const [smokeDetectorDateModel, setSmokeDetectorDateModel] = useState<formFieldType>({
        type: "date",
        label: "Smoke detector (Date checked)",
        value: "",
        error: "",
        validated: false
    });

    const [whatToDoModel, setWhatToDoModel] = useState<formFieldType>({
        type: "text",
        label: "What will the person discovering the fire do?",
        value: "",
        error: "",
        validated: false
    });

    const [howToAlarmModel, setHowToAlarmModel] = useState<formFieldType>({
        type: "text",
        label: "How will you sound the alarm?",
        value: "",
        error: "",
        validated: false
    });

    const [whatToDoBeforeFireDeptModel, setWhatToDoBeforeFireDeptModel] = useState<formFieldType>({
        type: "text",
        label: "What will you do before the fire department arrives?",
        value: "",
        error: "",
        validated: false
    });

    const [howToConfirmEvacuationModel, setHowToConfirmEvacuationModel] = useState<formFieldType>({
        type: "text",
        label: "How will you make sure all persons are evacuated and accounted for?",
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

        if(!noOfIndividualsModel.validated){
            setIsFormValid(false)
            return false;
        }
        if(!lengthOfDrillInMinutesModel.validated){
            setIsFormValid(false)
            return false;
        }
        if(!fireExtinguisherDateModel.validated){
            setIsFormValid(false)
            return false;
        }
        if(!smokeDetectorDateModel.validated){
            setIsFormValid(false)
            return false;
        }
        if(!whatToDoModel.validated){
            setIsFormValid(false)
            return false;
        }
        if(!howToAlarmModel.validated){
            setIsFormValid(false)
            return false;
        }
        if(!whatToDoBeforeFireDeptModel.validated){
            setIsFormValid(false)
            return false;
        }
        if(!howToConfirmEvacuationModel.validated){
            setIsFormValid(false)
            return false;
        }

        setIsFormValid(true)
        return true;
    }

    function completeTask() {
        if(validateForm()) {
            const payload = {
                noOfIndividuals: noOfIndividualsModel.value,
                lengthOfDrill: lengthOfDrillInMinutesModel.value,
                fireExtinguisherDate: fireExtinguisherDateModel.value,
                smokeDetectorDate: smokeDetectorDateModel.value,
                whatToDo: whatToDoModel.value,
                howToAlarm: howToAlarmModel.value,
                whatToDoBeforeFireDept: whatToDoBeforeFireDeptModel.value,
                howToConfirmEvacuation: howToConfirmEvacuationModel.value,
                note: notesModel.value
            }

            setCompleteTaskState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            completeFireDrillTaskAction(parseInt(params.taskId!), payload)
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
                console.log(error)
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

        const payload = {
            note: notesModel.value
        }

        setDeclineTaskState(state => ({
            ...state,
            status: "LOADING",
            message: "",
            error: false
        }))
    
        declineFireDrillTaskAction(parseInt(params.taskId!), payload)
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
        <div className={styles.fire_drill_details}>
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
                <div className={styles.title}>{taskState.taskDetails.service.title}</div>
                <div className={styles.task_status}>{ taskState.taskDetails.status }</div>
            </div>

            <SizedBox height="20px" />

            <div className={styles.instructions}>
                <div>Instruction: The goal is to have evacuation time complete less than 13 minutes.</div>
            </div>

            <SizedBox height="50px" />

            <FormWrapper extraStyles={styles.form_wrapper}>
                <RowContainer alignment="top">
                    <InputField
                        type={noOfIndividualsModel.type}
                        label={noOfIndividualsModel.label}
                        error={noOfIndividualsModel.error}
                        onInput={(value:string)=> setInput(value, noOfIndividualsModel, setNoOfIndividualsModel)}
                    />

                    <InputField
                        type={lengthOfDrillInMinutesModel.type}
                        label={lengthOfDrillInMinutesModel.label}
                        error={lengthOfDrillInMinutesModel.error}
                        onInput={(value:string)=> setInput(value, lengthOfDrillInMinutesModel, setLengthOfDrillInMinutesModel)}
                    />
                </RowContainer>

                <RowContainer alignment="top">
                    <InputField
                        type={fireExtinguisherDateModel.type}
                        label={fireExtinguisherDateModel.label}
                        error={fireExtinguisherDateModel.error}
                        onInput={(value:string)=> setInput(value, fireExtinguisherDateModel, setFireExtinguisherDateModel)}
                    />

                    <InputField
                        type={smokeDetectorDateModel.type}
                        label={smokeDetectorDateModel.label}
                        error={smokeDetectorDateModel.error}
                        onInput={(value:string)=> setInput(value, smokeDetectorDateModel, setSmokeDetectorDateModel)}
                    />
                </RowContainer>

                <RowContainer alignment="top">
                    <InputField
                        type={whatToDoModel.type}
                        label={whatToDoModel.label}
                        error={whatToDoModel.error}
                        onInput={(value:string)=> setInput(value, whatToDoModel, setWhatToDoModel)}
                    />

                    <InputField
                        type={howToAlarmModel.type}
                        label={howToAlarmModel.label}
                        error={howToAlarmModel.error}
                        onInput={(value:string)=> setInput(value, howToAlarmModel, setHowToAlarmModel)}
                    />
                </RowContainer>

                <RowContainer alignment="bottom">
                    <InputField
                        type={whatToDoBeforeFireDeptModel.type}
                        label={whatToDoBeforeFireDeptModel.label}
                        error={whatToDoBeforeFireDeptModel.error}
                        onInput={(value:string)=> setInput(value, whatToDoBeforeFireDeptModel, setWhatToDoBeforeFireDeptModel)}
                    />

                    <InputField
                        type={howToConfirmEvacuationModel.type}
                        label={howToConfirmEvacuationModel.label}
                        error={howToConfirmEvacuationModel.error}
                        onInput={(value:string)=> setInput(value, howToConfirmEvacuationModel, setHowToConfirmEvacuationModel)}
                    />
                </RowContainer>

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
                        label={"Complete"}
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
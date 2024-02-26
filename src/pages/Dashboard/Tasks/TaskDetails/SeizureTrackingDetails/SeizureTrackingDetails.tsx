import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal"
import styles from "./seizuretrackingdetails.module.css"
import SizedBox from "src/components/SizedBox"
import FormWrapper from "src/components/FormComponents/FormWrapper"
import TextField from "src/components/FormComponents/TextField"
import DeleteTextButton from "src/components/Buttons/DeleteTextButton"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"
import { completeSeizureTrackingTaskAction, declineSeizureTrackingTaskAction } from "src/features/task/action"
import { resetTaskState, useTaskState } from "src/features/task/state"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types"
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield"
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types"
import InputField from "src/components/FormComponents/InputField"

export default function SeizureTrackingDetails() {

    const params = useParams();

    const [taskState, setTaskState] = useTaskState();
    
    const [declineTaskState, setDeclineTaskState] = useState(taskState);

    const [completeTaskState, setCompleteTaskState] = useState(taskState);

    const [didSeizureOccur, setDidSeizureOccur] = useState<DropDownFormData>({
        label:"Did seizure occur?",
        options: [
            {
                id: '1',
                label: 'YES'
            },
            {
                id: '2',
                label: 'NO'
            }
        ],
        name: "did-seizure-occur",
        selected: false,
        selectedOptionIndex: 0,
        error:''

    })

    const [seizureStartModel, setSeizureStartModel] = useState<formFieldType>({
        type: 'time',
        label: "What time did seizure start",
        value: "",
        error: "",
        validated: false
    })

    const [seizureEndModel, setSeizureEndModel] = useState<formFieldType>({
        type: 'time',
        label: "What time did seizure end",
        value: "",
        error: "",
        validated: false
    })

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

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selectedOptionIndex = optionIndex;
        model.selected = true;

        setModel({...model});
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
                seizureStartDate: seizureStartModel.value,
                seizureEndModel: seizureEndModel.value,
                note: notesModel.value
            }

            setCompleteTaskState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            completeSeizureTrackingTaskAction(parseInt(params.taskId!), payload)
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
        const payload = {
            note: notesModel.value
        }

        setDeclineTaskState(state => ({
            ...state,
            status: "LOADING",
            message: "",
            error: false
        }))
    
        declineSeizureTrackingTaskAction(parseInt(params.taskId!), payload)
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
        <div className={styles.seizure_tracking_details}>
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
                <div className={styles.title}>Seizure Tracking</div>
                <div className={styles.task_status}>{ taskState.taskDetails.status }</div>
            </div>

            <SizedBox height="20px" />

            <div className={styles.instructions}>
                <div>1. Time the seizure</div>
                <div>2. Remove objects from the surrounding area</div>
                <div>3. DO NOT leave the individual alone during the seizure</div>
                <div>4. Loosen tight clothing, collars, and belt. Remove eyeglasses</div>
                <div>5. Do not restrain movements during a seizure unless the person is in danger</div>
                <div>6. If the individual is on the floor, protect his/her head</div>
                <div>7. Gently turn the individual to his/her side, to allow for secretions to drain from the mouth and prevent aspiration.</div>
            </div>

            <SizedBox height="50px" />

            <FormWrapper extraStyles={styles.form_wrapper}>

                <DropDownField 
                    label={didSeizureOccur.label}
                    options={didSeizureOccur.options} 
                    selected={didSeizureOccur.selected} 
                    selectedOptionIndex={didSeizureOccur.selectedOptionIndex}
                    error={didSeizureOccur.error}
                    onSelect={(optionIndex:number)=> selectOption(optionIndex, didSeizureOccur, setDidSeizureOccur)}
                />

                {
                    didSeizureOccur.value?.label.toLowerCase() === 'no'
                    ?   <TextField
                            label={notesModel.label}
                            error={notesModel.error}
                            onInput={(value:string)=> setInput(value, notesModel, setNotesModel)}
                        />
                    :   <div className={styles.other}>
                            <InputField
                                type={seizureStartModel.type}
                                label={seizureStartModel.label}
                                error={seizureStartModel.error}
                                onInput={(value:string)=> setInput(value, seizureStartModel, setSeizureStartModel)}
                            />
                            <InputField
                                type={seizureEndModel.type}
                                label={seizureEndModel.label}
                                error={seizureEndModel.error}
                                onInput={(value:string)=> setInput(value, seizureEndModel, setSeizureEndModel)}
                            />
                            <TextField
                                label={"What was client doing before the seizure happened?"}
                                error={notesModel.error}
                                onInput={(value:string)=> setInput(value, notesModel, setNotesModel)}
                            />
                        </div>
                }

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
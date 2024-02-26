import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import styles from "./behaviormanagementtaskdetails.module.css";
import SizedBox from "src/components/SizedBox";
import FormWrapper from "src/components/FormComponents/FormWrapper";
import TextField from "src/components/FormComponents/TextField";
import DeleteTextButton from "src/components/Buttons/DeleteTextButton";
import { useParams } from "react-router-dom";
import { resetTaskState, useTaskState } from "src/features/task/state";
import { useState } from "react";
import { formFieldType, setInput } from "src/components/FormComponents/FormWrapper/types";
import { completeBehaviorManagementTaskAction, declineBehaviorManagementTaskAction } from "src/features/task/action";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import Pill from "src/components/Pill";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";

export default function BehaviorManagementTaskDetails() {

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

    const [interventionModel, setInterventionModel] = useState<DropDownFormData>({
        label: "Intervention",
        options: [
            {
                id: '1',
                label: "Redirect to a preferred activity",
            },
            {
                id: '2',
                label: "Supervision at all times",
            },
            {
                id: '3',
                label: "redirect to low-stimulating and calming activities",
            }
        ],
        selected: false,
        selectedOptionIndex: 0,
        error: "",
        validated: false,
        name: ""
    });

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;
        model.validated = true;
        setModel({...model})
        validateForm();
    }

    function validateModel(updatedInputModel:formFieldType) {
        if(!updatedInputModel.value) {
            updatedInputModel.validated = false;
            validateForm()
            return
        }

        updatedInputModel.validated = true;
        validateForm();
        return
    }
4
    const [isFormValid, setIsFormValid] = useState(false);

    function validateForm() {
        if(!notesModel.validated) {
            setIsFormValid(false)
            return false;
        }

        if(!interventionModel.selected) {
            setIsFormValid(false)
            return false;
        }

        setIsFormValid(true)
        return true;
    }

    function completeTask() {
        if(validateForm()) {
            const payload = {
                intervention: interventionModel.value?.label.toString(),
                note: notesModel.value
            }

            setCompleteTaskState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            completeBehaviorManagementTaskAction(parseInt(params.taskId!), payload)
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
        if(notesModel.value) {
            const payload = {
                note: notesModel.value
            }

            setDeclineTaskState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            declineBehaviorManagementTaskAction(parseInt(params.taskId!), payload)
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

    return(
        <div className={styles.behavior_management_task_details}>
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
                <div className={styles.title}>Behavior Management</div>
                <div className={styles.task_status}>{ taskState.taskDetails.status }</div>
            </div>

            <SizedBox height="50px" />

            <div className={styles.details}>
                <div className={styles.title}>{ taskState.taskDetails.behaviorManagement.description }</div>
                
                <SizedBox height="20px" />

                <div className={styles.instructions}>
                    goals: { 
                        taskState.taskDetails.behaviorManagement.goals.map((goal)=> {
                            return <Pill key={goal} label={goal} />
                        })
                    }
                </div>
            </div>

            <SizedBox height="20px" />

            <FormWrapper extraStyles={styles.form_wrapper}>
                <DropDownField 
                    label={interventionModel.label}
                    error={interventionModel.error}
                    options={interventionModel.options} 
                    selected={interventionModel.selected} 
                    selectedOptionIndex={interventionModel.selectedOptionIndex}
                    onSelect={(optionIndex: number) => selectOption(optionIndex, interventionModel, setInterventionModel)} 
                />

                <TextField
                    label={notesModel.label}
                    error={notesModel.error}
                    onInput={(value:string)=> setInput(value, notesModel, setNotesModel, validateModel)}
                />

                <div className={styles.actions}>
                    <DeleteTextButton
                        label={"Decline"}
                        clickAction={declineTask}
                        disabled={!notesModel.validated}
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
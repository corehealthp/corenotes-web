import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal"
import styles from "./tornadodrilltaskdetails.module.css"
import SizedBox from "src/components/SizedBox"
import FormWrapper from "src/components/FormComponents/FormWrapper"
import RowContainer from "src/components/Layout/RowContainer"
import InputField from "src/components/FormComponents/InputField"
import TextField from "src/components/FormComponents/TextField"
import DeleteTextButton from "src/components/Buttons/DeleteTextButton"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"
import { resetTaskState, useTaskState } from "src/features/task/state"
import { completeTornadoDrillTaskAction, declineTornadoDrillTaskAction } from "src/features/task/action"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types"
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types"
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield"

export default function TornadoDrillTaskDetails() {

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

    const [didStaffAnnounceModel, setDidStaffAnnounceModel] = useState<DropDownFormData>({
        name:"did-staff-announce",
        label: "Did staff announce the start of drill?",
        options: [
            {
                id:"1",
                label:"YES"
            },
            {
                id:"2",
                label:"NO"
            }
        ],
        selected: false,
        selectedOptionIndex: 0,
        error: ""
    });

    const [didIndividualsEvacuateModel, setDidIndividualsEvacuateModel] = useState<formFieldType>({
        type: "text",
        label: "Did the individuals evacuate as quickly as possible to the nearest safe place?",
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

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;
        setModel({...model})

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

        if(!didStaffAnnounceModel.selected){
            setIsFormValid(false)
            return false;
        }

        if(!didIndividualsEvacuateModel.validated){
            setIsFormValid(false)
            return false;
        }

        setIsFormValid(true)
        return true;
    }

    function completeTask() {
        if(validateForm()) {
            const payload = {
                noOfIndividuals: parseInt(noOfIndividualsModel.value),
                didStaffAnnounce: didStaffAnnounceModel.value!.label.toLowerCase(),
                didIndividualsEvacuate: didIndividualsEvacuateModel.value,
                note: notesModel.value
            }

            setCompleteTaskState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            completeTornadoDrillTaskAction(parseInt(params.taskId!), payload)
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
    
        declineTornadoDrillTaskAction(parseInt(params.taskId!), payload)
        .then((response)=> {
            setCompleteTaskState(state => ({
                ...state,
                status:'IDLE',
                error: false,
                message: "",
            }))

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

            <SizedBox height="50px" />

            <FormWrapper extraStyles={styles.form_wrapper}>
                <RowContainer alignment="top">
                    <InputField
                        type={noOfIndividualsModel.type}
                        label={noOfIndividualsModel.label}
                        error={noOfIndividualsModel.error}
                        onInput={(value:string)=> setInput(value, noOfIndividualsModel, setNoOfIndividualsModel)}
                    />

                    <DropDownField
                        label={didStaffAnnounceModel.label}
                        options={didStaffAnnounceModel.options}
                        error={didStaffAnnounceModel.error}
                        selected={didStaffAnnounceModel.selected} 
                        selectedOptionIndex={didStaffAnnounceModel.selectedOptionIndex}
                        onSelect={(optionIndex: number) => selectOption(optionIndex, didStaffAnnounceModel, setDidStaffAnnounceModel)} 
                    />
                </RowContainer>

                <TextField
                    label={didIndividualsEvacuateModel.label}
                    error={didIndividualsEvacuateModel.error}
                    onInput={(value:string)=> setInput(value, didIndividualsEvacuateModel, setDidIndividualsEvacuateModel)}
                />

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
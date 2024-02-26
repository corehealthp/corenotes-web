import styles from "./taskdetails.module.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeleteTextButton from "src/components/Buttons/DeleteTextButton";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import GoBackButton from "src/components/Buttons/GoBackButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import InputField from "src/components/FormComponents/InputField";
import TextField from "src/components/FormComponents/TextField";
import SizedBox from "src/components/SizedBox";
import { administerMedTaskAction, adminiterUncontrolledMedTask, delineMedAdministrationTaskAction } from "src/features/task/action";
import { useFetchTaskDetailsSelector } from "src/features/task/selector";
import { resetTaskState, useTaskState } from "src/features/task/state";
import SelectMedicationModal from "../../Individuals/IndividualProfile/IndividualMedications/SelectMedicationModal";
import formatDate from "src/utils/formatDate";
import formatTime from "src/utils/formatTime";
import GridList from "src/components/GridList/GridList";
import UploadPhoto from "src/components/UploadPhoto";
import convertBase64toBlob from "src/utils/convertBase64ToBlob";
import JSONToFormData from "src/utils/JSONToFormData";
import GoalTrackingTaskDetails from "./GoalTrackingTaskDetails";
import SkinIntegrityTaskDetails from "./SkinIntegrityTaskDetails";
import BowelMovementTaskDetails from "./BowelMovementTaskDetails";
import DailyLivingActivityTaskDetails from "./DailyLivingActivityTaskDetails/DailyLivingActivityTaskDetails";
import ShiftNotesTaskDetails from "./ShiftNotesTaskDetails";
import BloodGlucoseCheckTaskDetails from "./BloodGlucoseCheckTaskDetails";
import BehaviorManagementTaskDetails from "./BehaviorManagementTaskDetails";
import SeizureTrackingDetails from "./SeizureTrackingDetails";
import TornadoDrillTaskDetails from "./TornadoDrillTaskDetails";
import FireDrillTaskDetails from "./FireDrillTaskDetails";
import ChoreTaskDetails from "./ChoreTaskDetails";
import PRNMedicationReviewDetails from "./PRNMedicationReviewDetails/PRNMedicationReviewDetails";

export default function TaskDetails() {
    
    const params = useParams();

    const [taskState, setTaskState] = useTaskState();

    const taskDetailsResponse = useFetchTaskDetailsSelector(parseInt(params.taskId!))
    
    useEffect(()=> {
        console.log(taskDetailsResponse.task)
        setTaskState(state => ({
            ...state,
            error: taskDetailsResponse.error,
            message: taskDetailsResponse.error ?taskDetailsResponse.message :"",
            taskDetails: taskDetailsResponse.task
        }))

    }, [taskDetailsResponse, setTaskState])

    const [medAmountTakenAdminModel, setMedAmountTakenAdminModel] = useState<formFieldType>({
        type: "number",
        label: "Amount administered",
        value: "1",
        readonly: true,
        error: "",
        validated: true
    })

    const [medAmountLeftAdminModel, setMedAmountLeftAdminModel] = useState<formFieldType>({
        type: "number",
        name: "amount-left",
        label: "Amount left after count",
        value: "",
        error: "",
        validated: false
    })

    const [medAdminNoteModel, setMedAdminNoteModel] = useState<formFieldType>({
        type: "text",
        placeholder: "Leave a note",
        value: "",
        error: "",
        validated: false
    })

    const [topicalPhotoModel, setTopicalPhotoModel] = useState<formFieldType>({
        value: "",
        error: "",
        validated: false
    })

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;
        validateModel(model);
        setModel({...model})

        enableButton();
        enableOtherButton();
    }

    function validateModel(model:formFieldType) {
        if(!model.value) {
            model.error = `Field cannot be empty`
            model.validated = false
            return
        }

        if(model.name === 'amount-left') {
            if(parseInt(model.value) !== (taskState.taskDetails.medication!.amountLeft - 1)) {
                model.error = "Amount left doesn't match the records, you can proceed still"
                model.validated = false
                return;
            }
        }
        
        model.error = ''
        model.validated = true
        return
    }

    const [isFormValid, setIsFormValid] = useState(false);

    const [isOtherFormValid, setIsOtherFormValid] = useState(false);

    function enableButton() {
        if(!medAmountTakenAdminModel.validated) {
            setIsFormValid(false)
            return;
        }
        if(!medAmountLeftAdminModel.validated) {
            setIsFormValid(false)
            return;
        }

        setIsFormValid(true)
        return;
    }

    function enableOtherButton() {
        if(taskState.taskDetails.medication?.route === 'topical') {
            if(!topicalPhotoModel.file) {
                setIsOtherFormValid(false)
                return;
            }
        }

        if(!medAdminNoteModel.validated) {
            setIsOtherFormValid(false)
            return;
        }

        setIsOtherFormValid(true)
        return;
    }

    function administerMed() {
        if(isFormValid) {
            const payload = {
                amountAdministered: parseInt(medAmountTakenAdminModel.value!),
                amountLeft: parseInt(medAmountLeftAdminModel.value!)
            }

            administerMedTaskAction(parseInt(params.taskId!), payload)
            .then((response)=> {
                setTaskState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error: false,
                    message: response.message,
                    taskDetails: response.data.task
                }))
            })
            .catch((error)=> {
                setTaskState(state => ({
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: error.message
                }))
            })
        }
    }

    function administerOtherMed() {
        const payload = {
            topicalPhoto: topicalPhotoModel.file,
            note: medAdminNoteModel.value
        }   

        console.log(payload)

        JSONToFormData(payload)
        .then((formDataPayload)=> {
            adminiterUncontrolledMedTask(params.taskId!, formDataPayload)
            .then((response)=> {
                setTaskState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error: false,
                    message: response.message,
                    taskDetails: response.data.task
                }))
            })
            .catch((error)=> {
                setTaskState(state => ({
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: error.message
                }))
            })
        })
    }

    function declineMedAdministration() {
        if(medAdminNoteModel.validated) {
            delineMedAdministrationTaskAction(params.taskId!)
            .then((response)=> {
                setTaskState(state => ({
                    ...state,
                    status:'SUCCESS',
                    error: false,
                    message: response.message,
                    taskDetails: response.data.task
                }))
            })
            .catch((error)=> {
                setTaskState(state => ({
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: error.message
                }))
            })

        } else {
            setMedAdminNoteModel(state => ({
                ...state,
                error: "Please state reason for decline",
                validated: false
            }))
        }
    }

    const [showAddPRNMedicationModal, setShowAddPRNMedicationModal] = useState(false)

    function setTopicalPhoto (imageSrc:string) {
        convertBase64toBlob(imageSrc)
        .then((newPhoto)=> {

            const file = new File([newPhoto], "topical_medication_photo", {
                type: "image/jpeg"
            })

            setTopicalPhotoModel(state => ({
                ...state,
                file: file
            }))

            setIsOtherFormValid(true)
        })
        .catch((error)=> {
            console.log(error)
        })
        .finally(()=> {
            enableOtherButton()
        })
    }

    return (
        <div className={styles.task_details}>
            
            <GoBackButton path={"/dashboard"} />

            {
                taskState.taskDetails.service.title === "goal tracking" ?   <GoalTrackingTaskDetails />
                :   taskState.taskDetails.service.title === "skin integrity" ?  <SkinIntegrityTaskDetails />
                :   taskState.taskDetails.service.title === "bowel movement" ?  <BowelMovementTaskDetails />
                :   taskState.taskDetails.service.title === "daily living activity" ?  <DailyLivingActivityTaskDetails />
                :   taskState.taskDetails.service.title === "shift notes" ?  <ShiftNotesTaskDetails />
                :   taskState.taskDetails.service.title === "blood glucose check" ?  <BloodGlucoseCheckTaskDetails />
                :   taskState.taskDetails.service.title === "behavior management" ?  <BehaviorManagementTaskDetails />
                :   taskState.taskDetails.service.title === "seizure tracking" ?  <SeizureTrackingDetails />
                :   taskState.taskDetails.service.title === "fire drill" ?  <FireDrillTaskDetails />
                :   taskState.taskDetails.service.title === "tornado drill" ?  <TornadoDrillTaskDetails />
                :   taskState.taskDetails.service.title === "chore" ?  <ChoreTaskDetails />
                :   taskState.taskDetails.service.title.toLowerCase() === "prn medication review" ?  <PRNMedicationReviewDetails />
                :   <div className={styles.generic_task_details}>
                        <FormStateModal 
                            status={taskState.status} 
                            error={taskState.error} 
                            message={taskState.message}
                            reset={()=>resetTaskState(setTaskState)}
                        />

                        <SizedBox height="30px" />

                        <div className={styles.prn_med}>
                            <FadedBackgroundButton
                                label="Attach PRN Medication"
                                width={"max-content"}
                                backgroundColor={"var(--blue-accent-100)"}
                                labelColor={"white"}
                                action={()=> setShowAddPRNMedicationModal(true)}
                            />
                        </div>

                        {
                            showAddPRNMedicationModal
                            ?   <SelectMedicationModal
                                    individualId={taskState.taskDetails.individual.id}
                                    individualMedicationId={taskState.taskDetails.medication!.id}
                                    medType={"PRN"}
                                    closeModal={()=> setShowAddPRNMedicationModal(false)} 
                                />
                            :   null
                        }

                        <div className={styles.title}>{ taskState.taskDetails?.service.title }</div>


                        <div className={styles.content}>

                            <div className={styles.details}> 
                                <div className={styles.meta}>
                                    <div className={styles.todo}>{ taskState.taskDetails.status }</div>
                                </div>

                                <div className={styles.desc}>
                                    <div className={styles.medication}>{ taskState.taskDetails.medication?.name }</div>
                                    
                                    <div className={styles.info}>
                                        <div className={styles.label}>Strength</div>
                                        <div className={styles.digit}>{ taskState.taskDetails.medication?.strength }</div>
                                    </div>

                                    <div className={styles.info}>
                                        <div className={styles.label}>Route</div>
                                        <div className={styles.digit}>{ taskState.taskDetails.medication?.route }</div>
                                    </div>

                                    <div className={styles.info}>
                                        <div className={styles.label}>indications</div>
                                        <div className={styles.indications}>
                                            {
                                                taskState.taskDetails.medication?.indications.map( indication => (
                                                    <div key={indication} className={styles.item}>{ indication }</div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div className={styles.info}>
                                        <div className={styles.label}>Category</div>
                                        <div className={`${styles.digit} ${styles.category}`}>{ taskState.taskDetails.medication?.category }</div>
                                    </div>

                                    <SizedBox height={"100px"} />
                                </div>
                            </div>

                            {
                                taskState.taskDetails.status !== "COMPLETED"
                                ?   <div className={styles.med_actions}>
                                        {
                                            taskState.taskDetails.medication?.category === "controlled"
                                            ?   <div>
                                                    <InputField
                                                        type={medAmountTakenAdminModel.type}
                                                        label={medAmountTakenAdminModel.label}
                                                        value={medAmountTakenAdminModel.value}
                                                        readonly={medAmountTakenAdminModel.readonly}
                                                        error={medAmountTakenAdminModel.error}
                                                        onInput={(value:string)=> setInput(value, medAmountTakenAdminModel, setMedAmountTakenAdminModel)}
                                                    />

                                                    <InputField
                                                        type={medAmountLeftAdminModel.type}
                                                        label={medAmountLeftAdminModel.label}
                                                        value={medAmountLeftAdminModel.value}
                                                        readonly={medAmountLeftAdminModel.readonly}
                                                        error={medAmountLeftAdminModel.error}
                                                        onInput={(value:string)=> setInput(value, medAmountLeftAdminModel, setMedAmountLeftAdminModel)}
                                                    />
                                                </div>
                                            :   null
                                        }

                                        {
                                            taskState.taskDetails.medication?.route === "topical"
                                            ?   <UploadPhoto savePhoto={(imageSrc:string)=> setTopicalPhoto(imageSrc)} />
                                            :   null
                                        }

                                        <TextField
                                            placeholder={medAdminNoteModel.placeholder}
                                            error={medAdminNoteModel.error}
                                            onInput={(value:string)=> setInput(value, medAdminNoteModel, setMedAdminNoteModel)}
                                        />

                                        <div className={styles.actions}>
                                            <DeleteTextButton
                                                label={"Decline"}
                                                clickAction={declineMedAdministration}
                                            />

                                            <PrimaryTextButton
                                                label={"Administered"}
                                                clickAction={taskState.taskDetails.medication?.category === "controlled" ?administerMed :administerOtherMed }
                                                isLoading={taskState.status === 'LOADING'}
                                                disabled={!isFormValid && !isOtherFormValid}
                                            />
                                        </div>
                                    </div>
                                :   null
                            }
                        </div>

                        {
                            taskState.taskDetails.medication?.PRN?.length
                            ?   <div className={styles.prn_medications}>
                                    <GridList columnCount={3}>
                                        {
                                            taskState.taskDetails.medication?.PRN.map(prnMedication => {
                                                return  <div 
                                                            key={prnMedication.id}
                                                            className={styles.prn_details}
                                                        >
                                                            <div className={styles.item_title}>{ prnMedication.title }</div>
                                                            <div className={styles.medication_dets}> 
                                                                <div className={styles.prn_med_name}>{prnMedication.name}</div>
                                                                <div className={styles.prn_med_amount}>x{ prnMedication.amountAdministered } </div>
                                                            </div>
                                                            <div className={styles.prn_date_time}>
                                                                <div className={styles.date}>{formatDate(prnMedication.createdAt.toString())}</div>
                                                                <div className={styles.time}>{formatTime(prnMedication.createdAt.toString())}</div>
                                                            </div>
                                                        </div>
                                            })
                                        }
                                    </GridList>
                                </div>
                            :   null
                        }
                    </div>
            }
        </div>
    )
}


import styles from "./individualmedicationreviewmodal.module.css";
import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useEffect, useState } from "react";
import RowContainer from "src/components/Layout/RowContainer";
import InputField from "src/components/FormComponents/InputField";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import SizedBox from "src/components/SizedBox";
import { discontinueIndividualMedicationAction, submitSupervisoryMedReviewAction } from "src/features/Individual/action";
import { useParams } from "react-router-dom";
import { useIndividualState } from "src/features/Individual/state";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import IndividualMedicationBarcode from "../IndividualMedicationBarcode";
import ToggleSwitch from "src/components/Buttons/ToggleButton";
import UserImage from "src/components/ImageComponent/UserImage";
import { useUserStateValue } from "src/features/user/state";
import Info from "src/components/Info";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { useFetchReviewHistorySelector } from "src/features/Individual/selector";
import capitalize from "src/utils/capitalize";
import { ReactComponent as IconOpenLink } from "src/assets/icons/icon-open-link.svg";
import SupervisoryReviewHistoryList from "./SupervisoryReviewHistoryList/SupervisoryReviewHistoryList";
import DeleteTextButton from "src/components/Buttons/DeleteTextButton";

interface IIndividualMedicationReviewModal {
    medId:number;
    active:boolean;
    barcode:string;
    name:string;
    category:string;
    frequency:string;
    time:string;
    strength:string;
    amount:{
        allocated:number;
        current:number;
        administered:number;
    };
    closeModal:()=> void
}

export default function IndividualMedicationReviewModal({
    medId,
    active,
    barcode,
    name, 
    category,
    strength,
    frequency,
    time,
    amount,
    closeModal
}:IIndividualMedicationReviewModal) {

    const params = useParams();
    const individualId = parseInt(params.individualId!);

    const userState = useUserStateValue();

    const [individualState, setIndividualState] = useIndividualState();

    const fetchReviewHistoryResponse = useFetchReviewHistorySelector(individualId, medId, individualState.supervisoryMedicationReviews.currentPage);
    
    const [months] = useState(['january', 'feburary', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']);
    
    useEffect(()=> {
        
        if(individualState.supervisoryMedicationReviews.medicationId !== fetchReviewHistoryResponse.supervisoryReviews.medicationId) {
            setIndividualState(state => ({
                ...state,
                error: fetchReviewHistoryResponse.error,
                message: fetchReviewHistoryResponse.message,
                supervisoryMedicationReviews: fetchReviewHistoryResponse.supervisoryReviews
            }))
        }

        const lastReviewMonthIndex = individualState.supervisoryMedicationReviews.lastMonthReviewed;
        const currentMonthIndex = new Date().getMonth();
        const monthsToChooseFrom = months.slice(lastReviewMonthIndex ?? currentMonthIndex,  months.length);
        const currentMonth = months[currentMonthIndex];

        const monthsToChooseFromMapped = monthsToChooseFrom.map((month, index) => ({
            id: index.toString(),
            label: capitalize(month),
            value: index.toString()
        }));

        const currentMonthMapped = monthsToChooseFromMapped.filter( (month) => month.label.toLowerCase() === currentMonth)[0];

        setReviewMonthModel(state => ({
            ...state,
            options: monthsToChooseFromMapped,
            value: currentMonthMapped,
            selected: true,
            selectedOptionIndex: 0,
        }))

        setIsReviewComplete(false);

        (()=> {
            setIndividualState(state => ({
                ...state,
                supervisoryMedicationReviews:{
                    medicationId: "",
                    list:[],
                    lastMonthReviewed:undefined,
                    currentPage:1,
                    totalPages:1
                },
            }))
        })

    }, [fetchReviewHistoryResponse, individualState.supervisoryMedicationReviews.lastMonthReviewed, individualState.supervisoryMedicationReviews.medicationId, months, setIndividualState])
 
    const [currentPillAmountModel, setCurrentPillAmountModel] = useState(amount.current);

    const [newPillsAmountModel, setNewPillsAmountModel] = useState<formFieldType>({
        type: "number",
        name:'new-pills',
        placeholder: "Enter the new amount",
        value: "",
        error: "",
        validated: false
    })

    const [newPharmacyModel, setNewPharmacyModel] = useState<formFieldType>({
        type: "text",
        placeholder: "Pharmacy",
        value: "",
        readonly: true,
        error: "",
        validated: false
    })

    const [isReviewComplete, setIsReviewComplete] = useState(false);
    
    const [reviewMonthModel, setReviewMonthModel] = useState<DropDownFormData>({
        name: "review-month",
        placeholder: "Review month",
        options: [],
        selected: false,
        selectedOptionIndex: 0,
        error: ""
    })

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;

        validateModel(model);

        if(model.name === 'new-pills') {
            const totalCurrentPills = amount.current + parseInt(model.value || "0")
            setCurrentPillAmountModel(totalCurrentPills)
        }

        setModel({...model})

        validateForm();
    }

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;

        setModel({...model})

        validateForm();
    }

    function validateModel(model:formFieldType) {
        if(!model.value) {
            model.error = `${model.placeholder} field cannot be empty`;
            model.validated = false;
            return;
        }
        
        model.error = "";
        model.validated = true;
        return;
    }

    const [isFormValid, setIsFormValid] = useState(false);

    function validateForm() {
        if(category === 'controlled' && !newPillsAmountModel.validated) {
            setIsFormValid(false)
            return;
        }
        if(!newPharmacyModel.validated) {
            setIsFormValid(false)
            return;
        }
        if(!isReviewComplete) {
            setIsFormValid(false)
            return;
        }

        setIsFormValid(true)
        return;
    }

    function performReview() {
        if(isFormValid) {

            const monthIndexFromAllMonths = months.findIndex(month => month === reviewMonthModel.value?.label.toLowerCase())

            const payload = {
                medicationId: medId,
                monthIndex: monthIndexFromAllMonths,
                newAmountAllocated: parseInt(newPillsAmountModel.value!) || 0,
                newPharmacy: newPharmacyModel.value!,
            }

            setIndividualState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            submitSupervisoryMedReviewAction(parseInt(params.individualId!), payload)
            .then((response)=> {
                setIndividualState(state => ({
                    ...state,
                    status: "SUCCESS",
                    error: false,
                    message: response.message,
                    supervisoryMedicationReviews: response.data,
                }))
            })
            .catch((error)=> {
                setIndividualState(state => ({
                    ...state,
                    status: "FAILED",
                    error: true,
                    message: error.message
                }))
            })
        }
    }

    function resetIndividualState() {
        setIndividualState(state => ({
            ...state,
            error: false,
            message: ""
        }))
    }

    const [showHistory, setShowHistory] = useState(false);

    function openReviewHistory() {
        setShowHistory(true);
    }

    function toggleContinueMedication() {

        const payload = {
            medicationId: medId,
            active: !active,
            currentPage: individualState.supervisoryMedicationReviews.currentPage
        }

        discontinueIndividualMedicationAction(individualId, payload)
        .then((response)=> {

            setIndividualState(state => ({
                ...state,
                status: "SUCCESS",
                error: false,
                message: "Medication discontinued successfully",
                medications: response.data
            }))
        })
        .catch(()=> {
            setIndividualState(state => ({
                ...state,
                status: "FAILED",
                error: true,
                message: "There was an error discontinuing this medication",
            }))
        })
    }

    return (
        <ModalContainer>
                <div className={styles.individual_medication_review}>

                    <FormStateModal 
                        status={individualState.status}
                        error={individualState.error}
                        message={individualState.message}
                        reset={resetIndividualState}
                    />

                    <div className={styles.header}>
                        <div className={styles.heading}>Supervisory Medication Review</div>
                        <IconCancelCircle className={styles.icon_cancel} onClick={closeModal}/>
                    </div>

                    {
                        !showHistory
                        ?   <div className={styles.body}>
                    
                                <div className={styles.title_header}>
                                    <div className={styles.title}>{ name + ' (' + strength +')' }</div>

                                    <div className={styles.history_link} onClick={()=> openReviewHistory()}> 
                                        <div className={styles.text}>Open history</div>
                                        <IconOpenLink className={styles.icon_open_link} />
                                    </div>
                                </div>

                                <SizedBox height="10px" />
                    
                                <RowContainer alignment="center">
                                    <div className={styles.schedule}>
                                        <div className={styles.time}>{ time }</div>
                                        <div className={styles.frequency}>{ frequency }</div>
                                    </div>

                                    {
                                        category === 'controlled'
                                        ?   <div className={styles.pills_count}>
                                                <div className={styles.administered}>
                                                    <div className={styles.digit}>{amount.administered}</div>
                                                    <div className={styles.label}>Taken</div>
                                                </div>

                                                <div className={styles.current}>
                                                    <div className={styles.digit}>{currentPillAmountModel}</div>
                                                    <div className={styles.label}>Left</div>
                                                </div>
                                            </div>
                                        :   <div hidden></div>
                                    }
                                    
                                    <div className={styles.barcode}>
                                        <IndividualMedicationBarcode barcode={barcode} />
                                    </div>
                                </RowContainer>

                                <SizedBox height="10px" />

                                <RowContainer alignment="top">
                                    <DropDownField
                                        placeholder={reviewMonthModel.placeholder}
                                        options={reviewMonthModel.options}
                                        error={reviewMonthModel.error} 
                                        selected={reviewMonthModel.selected} 
                                        selectedOptionIndex={reviewMonthModel.selectedOptionIndex}
                                        onSelect={(optionIndex:number)=> selectOption(optionIndex, reviewMonthModel, setReviewMonthModel)}
                                    />

                                    {
                                        category === 'controlled'
                                        ?   <InputField
                                                type={newPillsAmountModel.type}
                                                placeholder={newPillsAmountModel.placeholder}
                                                value={newPillsAmountModel.value}
                                                error={newPillsAmountModel.error}
                                                onInput={(value:string)=> setInput(value, newPillsAmountModel, setNewPillsAmountModel)}
                                            />
                                        :   <div hidden></div>
                                    }

                                    <InputField 
                                        type={newPharmacyModel.type}
                                        placeholder={newPharmacyModel.placeholder}
                                        value={newPharmacyModel.value}
                                        error={newPharmacyModel.error}
                                        onInput={(value:string)=> setInput(value, newPharmacyModel, setNewPharmacyModel)}
                                    />
                                </RowContainer>

                                <SizedBox height="20px" />

                                <div className={styles.medication_review_note}>
                                    <ToggleSwitch 
                                        initState={isReviewComplete}
                                        onToggle={(switchState:boolean)=> {
                                            setIsReviewComplete(switchState)
                                            
                                            if(category === 'controlled' && !newPillsAmountModel.validated) {
                                                setIsFormValid(false)
                                                return;
                                            }
                                            if(!newPharmacyModel.validated) {
                                                setIsFormValid(false)
                                                return;
                                            }
                                            if(!switchState) {
                                                setIsFormValid(false)
                                                return;
                                            }

                                            setIsFormValid(true)
                                            return;
                                        }} 
                                    />
                                    
                                    <SizedBox height="10px" />
                                    
                                    <div className={`${styles.note} ${ isReviewComplete ?styles.valid :null}`}>
                                        { 
                                            isReviewComplete
                                            ?   <span>Medications received from the pharmacy was reviewed for accuracy against prescribed medications</span>
                                            :   <span>Medications received from the pharmacy has not been reviewed for accuracy against prescribed medications</span>
                                        }
                                    </div>
                                </div>
                                
                                <SizedBox height="40px" />
                                
                                <RowContainer alignment="top">
                                    {
                                        active
                                        ?   <DeleteTextButton
                                                label="Discontinue"
                                                width="150px" 
                                                clickAction={()=> toggleContinueMedication()} 
                                            />
                                        :   <FadedBackgroundButton 
                                                label={"Continue"}
                                                backgroundColor={"var(--green-faded-accent-100)"}
                                                labelColor={"var(--green-accent-100)"}
                                                width="150px" 
                                                action={()=> toggleContinueMedication()}
                                            />
                                    }

                                    <div className={styles.signature}>
                                        <div className={styles.sign_label}>signed by</div>
                                        <div className={styles.user_dets}>  
                                            <UserImage 
                                                imageUrl={userState.details.personal.profileImage} 
                                                fullname={userState.details.personal.firstname}
                                                size={"30px"}
                                                fontSize={"1rem"}
                                            />
                                            <div className={styles.user_name}>{ userState.details.personal.firstname + ' ' + userState.details.personal.lastname  }</div>
                                        </div>

                                        <Info message={"Signature becomes permanent once review is completed"} />
                                    </div>
                                </RowContainer>
                            </div>
                        :   <div className={styles.body}>
                                <SupervisoryReviewHistoryList closeHistory={()=> setShowHistory(false)} />
                            </div>
                    }

                    <div className={styles.action_buttons}>

                        <FadedBackgroundButton 
                            label={"Cancel"}
                            backgroundColor={"var(--blue-accent-faded-100)"}
                            labelColor={"var(--blue-accent-100)"}
                            width="20%" 
                            action={()=> closeModal()}
                        />

                        <PrimaryTextButton
                            disabled={!isFormValid}
                            isLoading={individualState.status === 'LOADING'}
                            width={"max-content"}
                            label={"Complete review"}
                            clickAction={()=> performReview()}
                        />
                    </div>
                </div>
        </ModalContainer>
    )
}
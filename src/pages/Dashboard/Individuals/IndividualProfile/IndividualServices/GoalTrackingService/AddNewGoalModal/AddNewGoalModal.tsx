import styles from "./addnewgoalmodal.module.css";
import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useState } from "react";
import RowContainer from "src/components/Layout/RowContainer";
import InputField from "src/components/FormComponents/InputField";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import formatTime from "src/utils/formatTime";
import { useParams } from "react-router-dom";
import { addGoalToIndividualAction } from "src/features/Individual/action";
import { useIndividualState } from "src/features/Individual/state";

export default function AddNewGoalModal({ closeModal }:{ closeModal:()=> void }) {

    const params = useParams();

    const [individualState, setIndividualState] = useIndividualState();

    const [goalObjModel, setGoalObjModel] = useState<formFieldType>({
        type: "text",
        placeholder: "Goal objective",
        value:"",
        error: "",
        validated: false
    })

    const [implementMethodModel, setImplementMethodModel] = useState<DropDownFormData>({
        name:"implement-method",
        placeholder: "Implementation method",
        options: [
            {
                id:'1',
                label:'Physical assistant',
                value:'physical assistant'
            },
            {
                id:'2',
                label:'Verbal',
                value:'verbal'
            },
            {
                id:'3',
                label:'With demonstration / with gesture',
                value:'with demonstration / with gesture'
            },
            {
                id:'1',
                label:'Independent',
                value:'independent'
            },
            {
                id:'1',
                label:'Refused / Unable to perform',
                value:'refused / unable to perform'
            }
        ],
        error: '',
        selected: false,
        selectedOptionIndex: 0
    })

    const [serviceStartDateModel, setServiceStartDateModel] = useState<formFieldType>({
        type: 'date',
        placeholder:'Start date',
        value: '',
        error: '',
        validated: false
    })

    const [serviceTimeModel, setServiceTimeModel] = useState<formFieldType>({
        type: 'time',
        placeholder:'Time',
        value: '',
        error: '',
        validated: false
    })

    const [serviceEndDateModel, setServiceEndDateModel] = useState<formFieldType>({
        type: 'date',
        placeholder:'End date',
        value: '',
        error: '',
        validated: false
    })

    const [serviceFrequencyModel, setServiceFrequencyModel] = useState<DropDownFormData>({
        name: "service-freq",
        placeholder: "How often?",
        options: [
            {
                id:'1',
                label:'Daily',
                value:'daily'
            },
            {
                id:'2',
                label:'Every X Days',
                value:'every-x-days'
            },
            {
                id:'3',
                label:'Weekly',
                value:'weekly'
            },
            {
                id:'4',
                label:'Every X Weeks',
                value:'every-x-weeks'
            },
            {
                id:'5',
                label:'Monthly',
                value:'monthly'
            },
        ],
        selected: false,
        selectedOptionIndex: 0,
        error: ""
    })

    const [serviceFrequencyAttrModel, setServiceFrequencyAttrModel] = useState<formFieldType>({
        readonly: true,
        type: "number",
        label: "",
        placeholder: "",
        prefixIcon: <div children={"Every"} />,
        value:'',
        error: "",
        validated: false
    })

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;

        validateModel(model)
        setModel({...model})

        validateForm();
    }

    function validateModel(model:formFieldType) {
        if(!model.value) {
            model.error = `${model.placeholder} field cannot be empty`
            model.validated = false;
            return;
        }

        model.error = '';
        model.validated = true;
        return;
    }

    function selectOption (optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;

        if(model.name === 'service-freq') {
            if(model.value.value === 'every-x-days') {
                serviceFrequencyAttrModel.readonly = false;
                serviceFrequencyAttrModel.suffixIcon = <div className={styles.prefix_label} children={"days"} />
            }
            if(model.value.value === 'every-x-weeks') {
                serviceFrequencyAttrModel.readonly = false;
                serviceFrequencyAttrModel.suffixIcon = <div className={styles.prefix_label} children={"weeks"} />
            }
            if(!['every-x-weeks', 'every-x-days'].includes(model.value.value!)) {
                serviceFrequencyAttrModel.readonly = true;
                serviceFrequencyAttrModel.suffixIcon = undefined
                serviceFrequencyAttrModel.error = "";
            }

            setServiceFrequencyAttrModel(serviceFrequencyAttrModel);
        }

        setModel({...model});
        validateForm();
    }
    
    const [isFormValid, setIsFormValid] = useState(false)

    function validateForm() {

        if(!goalObjModel.validated) {
            setIsFormValid(false)
            return false;
        }
        
        if(!implementMethodModel.selected) {
            setIsFormValid(false)
            return false;
        }

        if(!serviceFrequencyModel.selected) {
            setIsFormValid(false)
            return false;
        }

        if(['every-x-days', 'every-x-weeks', 'every-x-days'].includes(serviceFrequencyModel.value?.value ?? "")) {
            if(!serviceFrequencyAttrModel.validated) {
                setIsFormValid(false)
                return false;
            }
        }

        if(!serviceStartDateModel.validated) {
            setIsFormValid(false)
            return false;
        }

        if(!serviceEndDateModel.validated) {
            setIsFormValid(false)
            return false;
        }

        setIsFormValid(true);
        return true
    }

    function submitGoalService() {
        if(validateForm()) {
            const payload = {
                objective: goalObjModel.value!,
                method: implementMethodModel.value!.value ?? "",
                schedule: {
                    startDate: serviceStartDateModel.value ?? "",
                    endDate: serviceEndDateModel.value ?? "",
                    time: formatTime(serviceTimeModel.value ?? "") ?? "",
                    frequency: serviceFrequencyModel.value?.value ?? "",
                    frequencyAttr: parseInt(serviceFrequencyAttrModel.value ?? "0")
                }
            }

            setIndividualState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false,
            }))

            addGoalToIndividualAction(params.individualId!, payload)
            .then((response)=> {
                setIndividualState(state => ({
                    ...state,
                    status: "SUCCESS",
                    message: "Service assigned to individual successfully",
                    error: false,
                    goalServices: response.data
                }))
            })
            .catch((error)=> {
                setIndividualState(state => ({
                    ...state,
                    status: "FAILED",
                    message: error.message,
                    error: true,
                }))
            })
        }
    }
    
    return (
        <ModalContainer>
            <div className={styles.add_new_goal_modal}>
                <div className={styles.header}>
                    <div className={styles.title}>Set New Goal</div>
                    <IconCancelCircle onClick={()=> individualState.status === 'LOADING' ?()=>({}) :closeModal() }/>
                </div>

                <div className={styles.body}>
                    <div className={styles.section_header}>
                        <div className={styles.digit}>1</div>
                        <div className={styles.text}>Goal details</div>
                    </div>

                    <RowContainer alignment="top">
                        <InputField
                            type={goalObjModel.type}
                            placeholder={goalObjModel.placeholder}
                            error={goalObjModel.error}
                            onInput={(value:string)=> setInput(value, goalObjModel, setGoalObjModel)}
                        />
                        
                        <DropDownField 
                            label={implementMethodModel.label}
                            placeholder={implementMethodModel.placeholder}
                            options={implementMethodModel.options}
                            selected={implementMethodModel.selected}
                            selectedOptionIndex={implementMethodModel.selectedOptionIndex}
                            error={implementMethodModel.error}
                            onSelect={(optionIndex:number)=> selectOption(optionIndex, implementMethodModel, setImplementMethodModel)}
                        />
                    </RowContainer>

                    <div className={styles.section_header}>
                        <div className={styles.digit}>2</div>
                        <div className={styles.text}>Schedule</div>
                    </div>

                    <RowContainer alignment={"top"}>
                        <DropDownField
                            placeholder={serviceFrequencyModel.placeholder}
                            options={serviceFrequencyModel.options}
                            selected={serviceFrequencyModel.selected} 
                            selectedOptionIndex={serviceFrequencyModel.selectedOptionIndex}
                            error={serviceFrequencyModel.error} 
                            onSelect={(optionIndex: number) => selectOption(optionIndex, serviceFrequencyModel, setServiceFrequencyModel)} 
                        />

                        <InputField
                            readonly={serviceFrequencyAttrModel.readonly}
                            extraInputContainerStyle={styles.side_padding}
                            type={serviceFrequencyAttrModel.type}
                            placeholder={serviceFrequencyAttrModel.placeholder}
                            prefixIcon={serviceFrequencyAttrModel.prefixIcon}
                            suffixIcon={serviceFrequencyAttrModel.suffixIcon}
                            error={serviceFrequencyAttrModel.error}
                            onInput={(value:string)=> setInput(value, serviceFrequencyAttrModel, setServiceFrequencyAttrModel)}
                        />

                        <InputField
                            type={serviceTimeModel.type}
                            placeholder={serviceTimeModel.placeholder}
                            value={serviceTimeModel.value}
                            error={serviceTimeModel.error}
                            onInput={(value:string)=> setInput(value, serviceTimeModel, setServiceTimeModel)}
                        />
                    </RowContainer>

                    <RowContainer alignment="top">
                        <InputField
                            type={serviceStartDateModel.type}
                            placeholder={serviceStartDateModel.placeholder}
                            value={serviceStartDateModel.value}
                            error={serviceStartDateModel.error}
                            onInput={(value:string)=> setInput(value, serviceStartDateModel, setServiceStartDateModel)}
                        />

                        <InputField
                            type={serviceEndDateModel.type}
                            placeholder={serviceEndDateModel.placeholder}
                            value={serviceEndDateModel.value}
                            error={serviceEndDateModel.error}
                            onInput={(value:string)=> setInput(value, serviceEndDateModel, setServiceEndDateModel)}
                        />
                    </RowContainer>      
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={individualState.status === 'LOADING'}
                        disabled={!isFormValid}
                        width={"20%"}
                        label="Submit"
                        clickAction={()=> submitGoalService()}
                    />
                </div>
            </div>
        </ModalContainer>    
    )
}
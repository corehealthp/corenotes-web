import { useEffect, useState } from "react";
import styles from "./addprnservicemodal.module.css";
import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { useIndividualState } from "src/features/Individual/state";
import { useFetchIndividualListSelector } from "src/features/Individual/selector";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import RowContainer from "src/components/Layout/RowContainer";
import InputField from "src/components/FormComponents/InputField";
import { fetchIndividualServicesAction } from "src/features/Individual/action";
import { useInitState } from "src/features/state";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import capitalize from "src/utils/capitalize";
import { createPRNTaskAction } from "src/features/task/action";
import { useTaskSetState } from "src/features/task/state";

export default function AddPRNServiceModal({closeModal}:{closeModal:()=> void}) {
    
    const setTaskState = useTaskSetState();

    const [individualState, setIndividualState] = useIndividualState();

    const [individualServicesState, setIndividualServicesState] = useInitState();

    const individualList = useFetchIndividualListSelector(individualState.individuals.currentListPage);

    useEffect(()=> {
        setIndividualModel(state => ({
            ...state,
            options: individualList.individuals.list.map((individual, index) => ({
                id: index.toString(),
                label: `${individual.firstname}, ${individual.lastname}`,
                value: individual.individualId.toString()
            }))
        }))
        
    }, [individualList.individuals.list])

    const [individualModel, setIndividualModel] = useState<DropDownFormData>({
        name: "selected-individual",
        placeholder: "Select Individual",
        options: [],
        selected: false,
        selectedOptionIndex: 0,
        error: ""
    });

    const [requestedServiceModel, setRequestedServiceModel] = useState<DropDownFormData>({
        name:"requested-service",
        placeholder: "Service",
        options: [],
        error: '',
        selected: false,
        selectedOptionIndex: 0
    })

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

    const [isFormValidated, setIsFormValidated] = useState(false);

    function validateForm() {

        if(!requestedServiceModel.selected) {
            setIsFormValidated(false)
            return false;
        }

        if(!serviceStartDateModel.validated) {
            setIsFormValidated(false)
            return false;
        }

        setIsFormValidated(true);
        return true
    }

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;
        model.validated = true;

        if(model.name === 'selected-individual') {
            setIndividualServicesState(state => ({
                ...state,
                status: 'LOADING',
                error: false,
                message: ""
            }))

            fetchIndividualServicesAction(model.value!.value!)
            .then((response)=> {
                setIndividualServicesState(state => ({
                    ...state,
                    status: 'IDLE',
                    error: false,
                    message: ""
                }))

               setRequestedServiceModel(state => ({
                    ...state,
                    options: response.data.individualServices.map((service, index) => ({
                        id: index.toString(),
                        label: `${capitalize(service.title)}`,
                        value: service.serviceId.toString()
                    }))
               }))
            })
            .catch(()=> {
                setIndividualServicesState(state => ({
                    ...state,
                    status: 'FAILED',
                    error: true,
                    message: "Couldn't get the individual services"
                }))
            })
        }
        
        setModel({ ...model });
    }

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

    function submit() {
        if(validateForm()) {
            const payload = {
                individualId: parseInt(individualModel.value!.value!.toString()),
                serviceId: parseInt(requestedServiceModel.value!.value!.toString()),
                schedule:{
                    startDate: serviceStartDateModel.value,
                    frequency: "",
                    frequencyAttr: 0,
                    time: serviceTimeModel.value
                }
            }
            
            createPRNTaskAction(payload)
            .then((response)=> {
                setIndividualState(state => ({
                    ...state,
                    status: 'SUCCESS',
                    error: false,
                    message: "PRN Service task created successfully",
                }));

                setTaskState(state => ({
                    ...state,
                    tasks: response.data
                }))
            })
            .catch((error)=> {
                setIndividualState(state => ({
                    ...state,
                    status: 'FAILED',
                    error: true,
                    message: error.message
                }))
            })
        }
    }

    return (
        <ModalContainer>
            <div className={styles.add_prn_med_modal}>
                <FormStateModal 
                    status={individualState.status}
                    message={individualState.message}
                    error={individualState.error}
                    reset={()=> setIndividualState(state => ({ ...state, status:"IDLE", message:"" }))}
                />

                <div className={styles.header}>
                    <div className={styles.titiel}>Add PRN service task</div>
                    <IconCancelCircle onClick={()=> individualState.status === 'LOADING' ?()=>({}) :closeModal() }/>
                </div>

                <div className={styles.body}>
                    <DropDownField
                        relative={true}
                        bottomOffset={"50px"}
                        placeholder={individualModel.placeholder}
                        options={individualModel.options}
                        selected={individualModel.selected} 
                        selectedOptionIndex={individualModel.selectedOptionIndex}
                        error={individualModel.error} 
                        onSelect={(optionIndex: number) => selectOption(optionIndex, individualModel, setIndividualModel)} 
                    />

                    <DropDownField 
                        label={requestedServiceModel.label}
                        placeholder={requestedServiceModel.placeholder}
                        showLoading={individualServicesState.status === 'LOADING'}
                        options={requestedServiceModel.options}
                        selected={requestedServiceModel.selected}
                        selectedOptionIndex={requestedServiceModel.selectedOptionIndex}
                        error={requestedServiceModel.error}
                        onSelect={(optionIndex:number)=> selectOption(optionIndex, requestedServiceModel, setRequestedServiceModel)}
                    />

                    <RowContainer>
                        <InputField
                            type={serviceStartDateModel.type}
                            placeholder={serviceStartDateModel.placeholder}
                            value={serviceStartDateModel.value}
                            error={serviceStartDateModel.error}
                            onInput={(value:string)=> setInput(value, serviceStartDateModel, setServiceStartDateModel)}
                        />

                        <InputField
                            type={serviceTimeModel.type}
                            placeholder={serviceTimeModel.placeholder}
                            value={serviceTimeModel.value}
                            error={serviceTimeModel.error}
                            onInput={(value:string)=> setInput(value, serviceTimeModel, setServiceTimeModel)}
                        />
                    </RowContainer>
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={individualState.status === 'LOADING'}
                        width={"20%"}
                        label="Submit"
                        clickAction={()=> submit()}
                        disabled={!isFormValidated}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}
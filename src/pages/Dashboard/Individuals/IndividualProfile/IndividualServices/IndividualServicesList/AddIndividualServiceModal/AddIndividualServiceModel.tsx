import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import styles from "./addindividualservicemodel.module.css";
import IndividualCompartmentForm from "src/pages/Dashboard/Individuals/IndividualsList/AddNewIndividualModal/IndividualHealthInformationForm/IndividualCompartmentForm";
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useIndividualState } from "src/features/Individual/state";
import { useEffect, useState } from "react";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { compartmentInitState, useCompartmentState } from "src/features/compartment/state";
import { getCompartmentDetails } from "src/features/compartment/action";
import { IAddServiceToIndividualPayload, addServiceToIndividualAction } from "src/features/Individual/action";
import { useParams } from "react-router-dom";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import InputField from "src/components/FormComponents/InputField";
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types";
import { getAllProvidedServiceAction } from "src/features/service/action";
import RowContainer from "src/components/Layout/RowContainer";
import formatTime from "src/utils/formatTime";
import SizedBox from "src/components/SizedBox";
import { addEventFeedbackItem, useGlobalEventFeedbackState } from "src/features/globalEventFeedback/state";

export default function AddIndividualServiceModal({ closeModal }:{ closeModal:()=> void }) {

    const [globalEventFeedback, setGlobalEventFeedback] = useGlobalEventFeedbackState();

    const { individualId } = useParams();

    const [individualState, setIndividualState] = useIndividualState();

    const [compartmentState, setCompartmentState] = useCompartmentState();

    const [serviceTypeModel, setServiceTypeModel] = useState<DropDownFormData>({
        name:"service-type",
        placeholder: "Service category",
        options: [
            {
                id:'1',
                label: 'Requested service',
                value: 'requested-service'
            },
            {
                id:'2',
                label: 'Provided service',
                value: 'provided-service'
            }
        ],
        error: '',
        selected: false,
        selectedOptionIndex: 0
    })

    const [requestedServiceModel, setRequestedServiceModel] = useState<DropDownFormData>({
        name:"requested-service",
        placeholder: "Service",
        options: [],
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
        model.validated = true;
        setModel({...model})
        validateForm();
    }

    function selectOption (optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;

        // if(model.name === 'requested-service') {
        //     if(model.value?.label.toLowerCase().split(' ').join('-') === 'medication-administration') {
        //         serviceFrequencyModel.selected = true;
        //         setServiceFrequencyModel({...serviceFrequencyModel})

        //         serviceFrequencyAttrModel.validated = true;
        //         setServiceFrequencyAttrModel({...serviceFrequencyAttrModel})

        //         serviceTimeModel.validated = true;
        //         setServiceTimeModel({...serviceTimeModel})

        //         serviceStartDateModel.validated = true;
        //         setServiceStartDateModel({...serviceStartDateModel})

        //     } else {
        //         serviceFrequencyModel.selected = false;
        //         setServiceFrequencyModel({...serviceFrequencyModel})

        //         serviceFrequencyAttrModel.validated = false;
        //         setServiceFrequencyAttrModel({...serviceFrequencyAttrModel})

        //         serviceTimeModel.validated = false;
        //         setServiceTimeModel({...serviceTimeModel})

        //         serviceStartDateModel.validated = false;
        //         setServiceStartDateModel({...serviceStartDateModel})
        //     }
        // }

        // if(model.name === 'service-freq') {
        //     if(model.value.value === 'every-x-days') {
        //         serviceFrequencyAttrModel.readonly = false;
        //         serviceFrequencyAttrModel.suffixIcon = <div className={styles.prefix_label} children={"days"} />
        //     }
        //     if(model.value.value === 'every-x-weeks') {
        //         serviceFrequencyAttrModel.readonly = false;
        //         serviceFrequencyAttrModel.suffixIcon = <div className={styles.prefix_label} children={"weeks"} />
        //     }
        //     if(!['every-x-weeks', 'every-x-days'].includes(model.value.value!)) {
        //         serviceFrequencyAttrModel.readonly = true;
        //         serviceFrequencyAttrModel.suffixIcon = undefined
        //         serviceFrequencyAttrModel.error = "";
        //     }

        //     setServiceFrequencyAttrModel(serviceFrequencyAttrModel);
        // }

        setModel({...model});
        validateForm();
    }

    const [servicesPages, setServicesPages] = useState({
        currentPage: 1,
        totalPages: 1,
    })

    useEffect(()=> {
        if(serviceTypeModel.value?.value?.toLowerCase() === 'provided-service') {
            getAllProvidedServiceAction(servicesPages.currentPage)
            .then(({data})=> {
                console.log(data)
                setServicesPages({
                    currentPage: data.currentPage,
                    totalPages: data.totalPages
                })

                setIndividualState(state => ({
                    ...state,
                    status:'IDLE',
                    error: false,
                    message: ""
                }))

                setRequestedServiceModel(state => ({
                    ...state,
                    options: data.services?.map(service => ({
                        id: service.id,
                        label: service.title,
                        value: service.refName
                    }))
                }))
            })
            .catch(()=> {
                setIndividualState(state => ({
                    ...state,
                    status:'FAILED',
                    error: true,
                    message: "There was an error fetching provided services list"
                }))
            })
        }

        if(serviceTypeModel.value?.value?.toLowerCase() === 'requested-service') {
            if(individualState.newIndividual.compartmentId) {
                getCompartmentDetails(individualState.newIndividual.compartmentId)
                .then((response)=> {
                    setCompartmentState(state => ({
                        ...state,
                        error: false,
                        message: '',
                        compartment: response.data.compartment
                    }))
                })
                .catch(()=> {
                    setCompartmentState(state => ({
                        ...state,
                        error: true,
                        compartment: compartmentInitState.compartment
                    }))
                })
                .finally(()=> {
                    setRequestedServiceModel(state => ({
                        ...state,
                        options: compartmentState.compartment.services.map(service => ({
                            id: service.id,
                            label: service.title,
                            value: service.refName
                        }))
                    }))
                })
            }
        }
        
    }, [compartmentState.compartment.services, individualId, individualState.newIndividual.compartmentId, serviceTypeModel.value?.value, servicesPages.currentPage, setCompartmentState, setIndividualState])

    const [isFormValidated, setIsFormValidated] = useState(false);

    function validateForm() {
        if(!serviceTypeModel.selected) {
            setIsFormValidated(false)
            return false;
        }

        if(!requestedServiceModel.selected) {
            setIsFormValidated(false)
            // console.log(requestedServiceModel.value!.value!)
            return false;
        }
        if(individualState.servicesWithTemplate.includes(requestedServiceModel.value!.value!)) {
            if(!serviceFrequencyModel.selected) {
                setIsFormValidated(false)
                return false;
            }
    
            if(['every-x-days', 'every-x-weeks', 'every-x-days'].includes(serviceFrequencyModel.value?.value ?? "")) {
                if(!serviceFrequencyAttrModel.validated) {
                    setIsFormValidated(false)
                    return false;
                }
            }
    
            if(!serviceStartDateModel.validated) {
                console.log('HERE')
                setIsFormValidated(false)
                return false;
            }
        }

        setIsFormValidated(true);
        return true
    }

    function submitForm() {
        // if(validateForm()) {

            const payload:IAddServiceToIndividualPayload = {
                serviceId: requestedServiceModel.value!.id!,
                schedule: null
            }

            payload["schedule"] = {
                startDate: serviceStartDateModel.value ?? "",
                time: formatTime(serviceTimeModel.value ?? "") ?? "",
                frequency: serviceFrequencyModel.value?.value ?? "",
                frequencyAttr: parseInt(serviceFrequencyAttrModel.value ?? "")
            }

            setIndividualState(state => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false,
            }))

            const newEventFeedback = {
                status:"",
                message:""
            };

            addServiceToIndividualAction(individualId!, payload)
            .then((response)=> {
                setIndividualState(state => ({
                    ...state,
                    status: "IDLE",
                    error: false,
                    requestedServices: response.data.individualServices
                }))

                newEventFeedback.status = "SUCCESS";
                newEventFeedback.message = "Service assigned to individual successfully"
            })
            .catch((error)=> {
                setIndividualState(state => ({
                    ...state,
                    status: "FAILED",
                    error: true,
                }))

                newEventFeedback.status = "ERROR";
                newEventFeedback.message = error.message ? `Error adding service to individual: ${error.message}` : "There was an error assigning service to individual"
            })
            .finally(()=> {
                addEventFeedbackItem(newEventFeedback, [...globalEventFeedback], setGlobalEventFeedback);
                closeModal();
            })
        // }
    }

    function resetFormStateModal() {
        setIndividualState(state => ({
            ...state,
            status: "IDLE",
            message: "",
            error: false,
        }))
    }

    return (
        <ModalContainer close={()=> closeModal()}>
            <div className={styles.add_individual_service_modal}>
                <FormStateModal 
                    status={individualState.status} 
                    error={individualState.error} 
                    message={individualState.message}
                    reset={()=> resetFormStateModal()} 
                />

                <div className={styles.header}>
                    <div className={styles.heading}>Add service to individual</div>
                    <IconCancelCircle onClick={()=> closeModal()} />
                </div>

                <div className={styles.body}>
                    <DropDownField 
                        label={serviceTypeModel.label}
                        placeholder={serviceTypeModel.placeholder}
                        options={serviceTypeModel.options}
                        selected={serviceTypeModel.selected}
                        selectedOptionIndex={serviceTypeModel.selectedOptionIndex}
                        error={serviceTypeModel.error}
                        onSelect={(optionIndex:number)=> selectOption(optionIndex, serviceTypeModel, setServiceTypeModel)}
                    />

                    {
                        serviceTypeModel.value?.value?.toLowerCase() === 'requested-service'
                        ?   <IndividualCompartmentForm removeLabel={true} />
                        :   null
                    }

                    <DropDownField 
                        label={requestedServiceModel.label}
                        placeholder={requestedServiceModel.placeholder}
                        options={requestedServiceModel.options}
                        selected={requestedServiceModel.selected}
                        selectedOptionIndex={requestedServiceModel.selectedOptionIndex}
                        error={requestedServiceModel.error}
                        onSelect={(optionIndex:number)=> selectOption(optionIndex, requestedServiceModel, setRequestedServiceModel)}
                    />

                {
                    requestedServiceModel.value &&
                    !individualState.servicesWithTemplate.includes(requestedServiceModel.value?.label.toLowerCase().split(' ').join('-') ?? "")
                    ?   <div>
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
                            </RowContainer>
                            <SizedBox height="15px" />
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
                    :   null
                }
                </div>

                <div className={styles.buttons}>
                    <FadedBackgroundButton 
                        width="200px"
                        label="Cancel"
                        labelColor={"var(--blue-accent-200)"}
                        backgroundColor={"var(--blue-accent-faded-100)"}
                        action={() => close()}
                    />
                    
                    <PrimaryTextButton
                        width="200px"
                        label="Assign Service"
                        clickAction={()=> submitForm()}
                        disabled={!isFormValidated}
                        isLoading={individualState.status === 'LOADING'}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}
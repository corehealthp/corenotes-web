import ModalContainer from "src/components/Modal/ModalContainer"
import styles from "./addservicemodal.module.css"
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg"
import InputField from "src/components/FormComponents/InputField"
import { useState } from "react"
import { formFieldType, setFormFieldType } from "src/components/FormComponents/FormWrapper/types"
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton"
import FadedBackgroundButton from "src/components/Buttons/FadedBackgroundButton"
import { useServicesState } from "src/features/service/state"
import { newServiceData, postService } from "src/features/service/action"
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types"
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield"
import MultiSelectDropDownField from "src/components/FormComponents/DropDownField/MultiSelectDropDownField"
import { MultiSelectDropDownFormData } from "src/components/FormComponents/DropDownField/MultiSelectDropDownField/types"
import { useCompartmentStateValue } from "src/features/compartment/state"
import { addEventFeedbackItem, useGlobalEventFeedbackState } from "src/features/globalEventFeedback/state"

export default function AddCompartmentModal({ close }:{close:()=> void}) {

    const [globalEventFeedback, setGlobalEventFeedback] = useGlobalEventFeedbackState();

    const [servicesState, setServicesState] = useServicesState();

    const compartmentStateValue = useCompartmentStateValue()

    const [serviceTitle, setserviceTitle] = useState<formFieldType>({
        type:'text',
        placeholder:'Enter name of service',
        value:'',
        error:'',
        validated:false
    })

    const [serviceCategory, setServiceCategory] = useState<DropDownFormData>({
        placeholder:'Select service category',
        name:'service-category',
        options: [
            {
                id:'1',
                label:'Requested',
            },
            {
                id:'2',
                label:'Provided',
            },
        ],
        error:'',
        selected:false,
        selectedOptionIndex:0
    })
    
    const [serviceCompartments, setServiceCompartments] = useState<MultiSelectDropDownFormData>({
        placeholder:'Select compartments',
        options: compartmentStateValue.compartmentsList.map( compartment => compartment.title),
        error:'',
        value:[],
        info: 'An empty selection means service is available to all compartments',
        validated: false
    }) 

    function setInput(value:string, model:formFieldType, setModel:setFormFieldType) {
        model.value = value;
        validateModel(model)
        setModel({...model});

        validateForm();
    }

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;

        setModel({...model})
        validateForm()
    }

    function selectCompartments(selectedOptions:Array<string>) {
        const allSelectedOptionsId:Array<string> = [];

        selectedOptions.forEach(option => {
            compartmentStateValue.compartmentsList.forEach(compartment => {
                if(compartment.title.toLowerCase() === option.toLowerCase())
                allSelectedOptionsId.push(compartment.id);
            })
        })

        setServiceCompartments(state => ({ ...state, value: allSelectedOptionsId }))
    }

    function validateModel(updatedModel:formFieldType) {
        if(!updatedModel.value) {
            updatedModel.error = "Field cannot be empty";
            updatedModel.validated = false;
            return;
        }

        const isMatch = servicesState.servicesList.filter((service) => service.title === updatedModel.value.toLowerCase())[0]?.title;

        if(isMatch) {
            updatedModel.error = "Compartment already exist";
            updatedModel.validated = false;
            return;
        }

        updatedModel.error = "";
        updatedModel.validated = true;
        return;
    }

    const [isFormValidated, setIsFormValidated] = useState(false)

    function validateForm() {
        if(!serviceTitle.validated) {
            setIsFormValidated(false);
            return;
        }
        if(!serviceCategory.selected) {
            setIsFormValidated(false);
            return;
        }


        setIsFormValidated(true);
        return;
    }

    function submitService() {
        if(isFormValidated) {

            const payload:newServiceData = {
                title: serviceTitle.value,
                category: serviceCategory.value!.label,
                compartments: serviceCompartments.value
            }
            
            setServicesState(state => ({
                ...state,
                status: 'LOADING', 
                error: false,
                message: ""
            }))

            const newEventFeedback = {
                status:"",
                message: ""
            }

            postService(payload)
            .then((response)=> {
                setServicesState(state => ({
                    ...state,
                    status: 'SUCCESS', 
                    error: false,
                    message: "New Service successfully created",
                    servicesList: response.data.services,
                    currentListPage: response.data.currentPage,
                    totalListPages: response.data.totalPages,
                }))

                newEventFeedback.status = "SUCCESS";
                newEventFeedback.message = "New Service successfully created";
            })
            .catch((error)=> {
                setServicesState(state => ({
                    ...state,
                    status: 'IDLE',
                    error: true
                }))

                newEventFeedback.status = "ERROR";
                newEventFeedback.message = error.message ?? "There was a server creating new service";
            })
            .finally(()=> {
                addEventFeedbackItem(newEventFeedback, [ ...globalEventFeedback ], setGlobalEventFeedback);
                close();
            })
        }
    }

    return (
        <ModalContainer close={()=> close()}>
            <div className={styles.container}>

                <div className={styles.heading}>
                    <div className={styles.title}>Services</div>
                    <IconCancelCircle onClick={()=> close()} style={{cursor:"pointer"}} />
                </div>

                <div className={styles.body}>
                    <InputField
                        placeholder={serviceTitle.placeholder}
                        value={serviceTitle.value}
                        error={serviceTitle.error}
                        onInput={(value)=> setInput(value, serviceTitle, setserviceTitle)}
                    />

                    <DropDownField
                        placeholder={serviceCategory.placeholder}
                        options={serviceCategory.options}
                        selected={serviceCategory.selected}
                        selectedOptionIndex={serviceCategory.selectedOptionIndex}
                        error={serviceCategory.error}
                        onSelect={(optionIndex:number) => selectOption(optionIndex, serviceCategory, setServiceCategory)} 
                    />

                    {
                        serviceCategory.value?.label.toLowerCase() === 'requested'
                        ?   <MultiSelectDropDownField 
                                label={""}
                                placeholder={serviceCompartments.placeholder}
                                options={serviceCompartments.options} 
                                error={serviceCompartments.error} 
                                info={serviceCompartments.info}
                                onSelect={(selectedOptions)=> selectCompartments(selectedOptions)}
                            />
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
                        label="Create service"
                        clickAction={()=> submitService()}
                        disabled={!isFormValidated}
                        isLoading={servicesState.status === 'LOADING'}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}
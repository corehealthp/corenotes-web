import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import { useCompartmentState } from "src/features/compartment/state";
import styles from "./addservicetocompartmentmodal.module.css";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { Suspense, useState } from "react";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import ServicesListDropDownField from "src/pages/Dashboard/Services/components/ServicesListDropDownField";
import { useParams } from "react-router-dom";
import { patchCompartmentServiceDetails } from "src/features/compartment/action";
import ComponentLoader from "src/components/Loaders/ComponentLoader";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";2

export default function AddServiceToCompartmentModal({ closeModal }:{ closeModal:()=> void }) {

    const params = useParams();


    const [compartmentState, setCompartmentState] = useCompartmentState();

    const [serviceCategory, setServiceCategory] = useState<DropDownFormData>({
        name:'service-category',
        placeholder:'Service category',
        options: [
            {
                id:'1',
                label:'All services',
                value: 'all'
            },
            {
                id:'2',
                label:'Requested services',
                value: 'requested'
            },
            {
                id:'3',
                label:'Provided services',
                value: 'provided'
            }
        ],
        value:{
            id:'1',
            label:'All services',
            value: 'all'
        },
        selected:false,
        selectedOptionIndex:0,
        error:''
    })

    const [serviceId, setServiceId] = useState<string>('');

    function selectOption (optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;

        setModel({...model})
    }

    function submitService() {
        const payload = {
            serviceId: serviceId
        }

        setCompartmentState(state => ({
            ...state,
            status: 'LOADING',
            error: false,
            message: ''
        }))

        patchCompartmentServiceDetails(parseInt(params.compartmentId!), payload)
        .then((response)=> {
            setCompartmentState(state => ({
                ...state,
                status: 'SUCCESS',
                error: false,
                message: response.message,
                compartment: {
                    ...state.compartment,
                    services: response.data.compartmentServices
                }
            }))

            createGlobalFeedback("success", response.message);
        })
        .catch((error)=> {
            setCompartmentState(state => ({
                ...state,
                status: 'FAILED',
                error: true,
                message: error.message
            }))

            createGlobalFeedback("error", error.message);
        })
        .finally(()=> closeModal())
    }

    return (
        <ModalContainer>
            <div className={styles.add_service_to_compartment_model}>

                <div className={styles.header}>
                    <div className={styles.title}>Add service to category</div>
                    <IconCancelCircle className={styles.icon_cancel} onClick={()=> compartmentState.status === 'LOADING' ?()=>({}) :closeModal() }/>
                </div>

                <div className={styles.body}>
                    <DropDownField 
                        placeholder={serviceCategory.placeholder}
                        options={serviceCategory.options} 
                        error={serviceCategory.error} 
                        selected={serviceCategory.selected} 
                        selectedOptionIndex={serviceCategory.selectedOptionIndex}
                        onSelect={(optionIndex:number)=> selectOption(optionIndex, serviceCategory, setServiceCategory)} 
                    />

                    <Suspense fallback={<ComponentLoader />}>
                        <ServicesListDropDownField 
                            category={serviceCategory.value!.value!} 
                            serviceSelected={(id:string)=> setServiceId(id)}
                        />
                    </Suspense>
                    
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={compartmentState.status === 'LOADING'}
                        disabled={!serviceId}
                        width={"20%"}
                        label="Submit"
                        clickAction={()=> submitService()}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}
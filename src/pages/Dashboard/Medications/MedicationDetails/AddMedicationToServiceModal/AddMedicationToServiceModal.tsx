import ModalContainer from "src/components/Modal/ModalContainer";
import styles from "./addmedicationtoservicemodal.module.css";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { medicationInitState, useMedicationState } from "src/features/medication/state";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { useFetchServicesList } from "src/features/service/selector";
import { useStaffValue } from "src/features/staff/state";
import { addMedicationToServiceAction } from "src/features/medication/action";

export default function AddMedicationToServiceModal({ 
    closeModal 
}:{ closeModal:()=> void }) {

    const params = useParams();

    const staffState = useStaffValue();

    const [medicationState, setMedicationState] = useMedicationState();

    const servicesListResponse = useFetchServicesList(staffState.currentPage);

    useEffect(()=> {
        setServiceModel(state => ({
            ...state,
            options: servicesListResponse.list.services.map((service)=> ({
                id: service.id,
                label: service.title,
                value: service.id
            }))
        }))

    }, [servicesListResponse.list.services])

    const [serviceModel, setServiceModel] = useState<DropDownFormData>({
        name: "services",
        placeholder: "Select service to add medication to",
        options: [],
        selected: false,
        selectedOptionIndex: 0,
        error: ""
    });

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;

        setModel({ ...model });

        if(model.selected) setIsFormValidated(true);
    }

    const [isFormValidated, setIsFormValidated] = useState(false)

    function submitAddMedicationToService() {
        if(serviceModel.selected) {
            const payload = {
                medicationId: parseInt(params.medicationId!),
                serviceId: serviceModel.value!.value!
            }   

            addMedicationToServiceAction(payload)
            .then((response)=> {
                setMedicationState(state => ({
                    ...state,
                    status: 'SUCCESS',
                    message: response.message,
                    error: false,
                    medicationDetails: response.data.medication
                }))
            })
            .catch((error)=> {
                setMedicationState(state => ({
                    ...state,
                    status: 'FAILED',
                    message: error.message,
                    error: true
                }))
            })
        }
    }
    
    function resetMedicationState() {
        setMedicationState(state => ({
            ...state,
            status:'IDLE',
            message: medicationInitState.message,
            error: false,
        }));
    }
    
    
    return (
        <ModalContainer>
            <div className={styles.add_medication_to_service}>

                <FormStateModal 
                    status={medicationState.status}
                    error={medicationState.error}
                    message={medicationState.message}
                    reset={()=> resetMedicationState()}
                />

                <div className={styles.header}>
                    <div className={styles.titiel}>Add medication to service</div>
                    <IconCancelCircle onClick={()=> closeModal()}/>
                </div>

                <div className={styles.body}>
                    <DropDownField
                        relative={true}
                        bottomOffset={"200px"}
                        placeholder={serviceModel.placeholder}
                        options={serviceModel.options}
                        selected={serviceModel.selected} 
                        selectedOptionIndex={serviceModel.selectedOptionIndex}
                        error={serviceModel.error} 
                        onSelect={(optionIndex: number) => selectOption(optionIndex, serviceModel, setServiceModel)} 
                    />
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={ medicationState.status === 'LOADING' }
                        disabled={!isFormValidated}
                        width={"20%"}
                        label="Submit"
                        clickAction={()=> submitAddMedicationToService()}
                    />
                </div>
            </div>
        </ModalContainer>
    )
}
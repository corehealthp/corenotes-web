import { useEffect, useState } from "react";
import styles from "./addprnmedicationmodal.module.css";
import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import DropDownField from "src/components/FormComponents/DropDownField/dropdownfield";
import { DropDownFormData, setDropDownFormData } from "src/components/FormComponents/DropDownField/types";
import { useIndividualStateValue } from "src/features/Individual/state";
import SelectMedicationModal from "src/pages/Dashboard/Individuals/IndividualProfile/IndividualMedications/SelectMedicationModal";
import { useFetchIndividualListSelector } from "src/features/Individual/selector";

export default function AddPRNMedicationModal({closeModal}:{closeModal:()=> void}) {

    const individualState = useIndividualStateValue();

    const individualList = useFetchIndividualListSelector(individualState.individuals.currentListPage);

    useEffect(()=> {
        setIndividualModel(state => ({
            ...state,
            options: individualList.individuals.list.map((individual, index) => ({
                id: index.toString(),
                label: `${individual.firstname}, ${individual.lastname}`,
                value: individual.id
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

    function selectOption(optionIndex:number, model:DropDownFormData, setModel:setDropDownFormData) {
        model.value = model.options[optionIndex];
        model.selected = true;
        model.selectedOptionIndex = optionIndex;
        model.validated = true;
        
        setModel({ ...model });
    }

    const [showSelectMedicationModal, setShowSelectMedicationModal] = useState(false);

    function nextStep() {
        setShowSelectMedicationModal(true);
    }

    return (
        !showSelectMedicationModal
        ?   <ModalContainer>
                <div className={styles.add_prn_med_modal}>
                    <div className={styles.header}>
                        <div className={styles.titiel}>Add PRN medication </div>
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
                    </div>

                    <div className={styles.buttons}>
                        <PrimaryTextButton
                            isLoading={individualState.status === 'LOADING'}
                            width={"20%"}
                            label="Submit"
                            backgroundColor={"var(--green-accent-100)"}
                            clickAction={()=> nextStep()}
                            backgroundColor="green"

                        />
                    </div>
                </div>
            </ModalContainer>
        :   <SelectMedicationModal 
                individualId={individualModel.value?.value}
                medType={"PRN"}
                closeModal={() => setShowSelectMedicationModal(false)} 
            />
    )
}
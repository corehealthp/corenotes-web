import DataLoadingError from "src/components/DataLoadingError";
import IndividualMedicationCard from "./IndividualMedicationCard";
import styles from "./individualmedicationslist.module.css";
import { useIndividualState } from "src/features/Individual/state";
import { useFetchIndividualMedicationsList } from "src/features/Individual/selector";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import GridList from "src/components/GridList/GridList";
import IndividualMedicationReviewModal from "../IndividualMedicationReviewModal";

export default function IndividualMedicationsList() {

    const param = useParams();

    const [individualState, setIndividualState] = useIndividualState();

    const fetchMedicationsListResponse = useFetchIndividualMedicationsList(parseInt(param.individualId!), individualState.medications.currentPage)

    useEffect(()=> {
        setIndividualState((state:any) => ({
            ...state,
            medications: fetchMedicationsListResponse.medications
        }))
    }, [fetchMedicationsListResponse, setIndividualState])

    const [medReviewModal, setMedReviewModal] = useState({
        visible: false,
        index: 0
    });

    function showReviewModal(indexToShow:number) {
        setMedReviewModal(({
            visible: true,
            index: indexToShow
        }))
    }

    return (
        <div className={styles.individual_medications_list}>
            <GridList columnCount={2}>
                {
                    individualState.medications.list.length
                    ?   individualState.medications.list.map(( {medication, index}:any ) => {
                            return  <IndividualMedicationCard
                                        key={medication.id}
                                        name={medication.name}
                                        active={medication.active}
                                        category={medication.category}
                                        strength={medication.strength}
                                        amount={medication.amount}
                                        frequency={medication.frequency}
                                        time={medication.time}
                                        action={()=> showReviewModal(index)}
                                    />
                        })
                    :   <DataLoadingError message="Individual has no medications" />
                }
            </GridList>
            
            {
                medReviewModal.visible
                ?   <IndividualMedicationReviewModal
                        medId={individualState.medications.list[medReviewModal.index].medicationId}
                        active={individualState.medications.list[medReviewModal.index].active}
                        barcode={individualState.medications.list[medReviewModal.index].barcode}
                        name={individualState.medications.list[medReviewModal.index].name}
                        category={individualState.medications.list[medReviewModal.index].category}
                        strength={individualState.medications.list[medReviewModal.index].strength}
                        amount={individualState.medications.list[medReviewModal.index].amount}
                        frequency={individualState.medications.list[medReviewModal.index].frequency}
                        time={individualState.medications.list[medReviewModal.index].time}
                        closeModal={()=> setMedReviewModal(state => ({ ...state, visible: false }))}
                    />
                :   null
            }
        </div>
    )
}
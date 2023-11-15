import { useEffect, useState } from "react"
import MedicationListHeader from "./MedicationsListHeader"
import styles from "./medicationslist.module.css"
import CreateMedicationModal from "../AddMedicationModal"
import { useMedicationState } from "src/features/medication/state";
import { useFetchMedicationsListSelector } from "src/features/medication/selector";
import MedicationsListTable from "./MedicationsListTable";

export default function MedicationsList() {

    const [medicationState, setMedicationState] = useMedicationState();

	const medicationListResponse = useFetchMedicationsListSelector("", medicationState.medications.currentPage);

	useEffect(() => {
		setMedicationState((state) => ({
			...state,
			message: medicationListResponse.message,
			error: medicationListResponse.error,
			medications: medicationListResponse.medications,
		}));
	}, [medicationListResponse, setMedicationState]);

	const [showCreateMedicationModal, setShowCreateMedicationModal] = useState(false);

	function goToSelectedPageNumber(pageNumber: number) {
		setMedicationState((state) => ({
			...state,
			medications: {
				...state.medications,
				currentPage: pageNumber,
			},
		}));
	}

	return (
		<div className={styles.medications_list_page}>
			<MedicationListHeader
				addMedication={() => setShowCreateMedicationModal(true)}
			/>

			<MedicationsListTable
				medications={medicationState.medications.list}
				currentPage={medicationState.medications.currentPage}
				totalPages={medicationState.medications.totalPages}
				goToPage={(selectedPageNumber: number) => goToSelectedPageNumber(selectedPageNumber)}
				errorMessage={"No medications to show"}
			/>

			{showCreateMedicationModal ? (
				<CreateMedicationModal
					closeModal={() => setShowCreateMedicationModal(false)}
				/>
			) : null}
		</div>
	);
}
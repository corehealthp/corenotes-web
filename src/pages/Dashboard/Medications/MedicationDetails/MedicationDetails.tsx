import styles from "./medicationdetails.module.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMedicationState } from "src/features/medication/state";
import { useFetchMedicationDetailsSelector } from "src/features/medication/selector";
import GoBackButton from "src/components/Buttons/GoBackButton";
import SizedBox from "src/components/SizedBox";
import AddMedicationToServiceModal from "./AddMedicationToServiceModal/AddMedicationToServiceModal";
import IconButton from "src/components/Buttons/IconButton";
import EditMedicationModal from "./EditMedicationModal";

export default function MedicationDetails() {
	const params = useParams();

	const [medicationState, setMedicationState] = useMedicationState();

	const medicationDetailsResponse = useFetchMedicationDetailsSelector(
		parseInt(params.medicationId!)
	);

	useEffect(() => {
		setMedicationState((state:any) => ({
			...state,
			error: medicationDetailsResponse.error,
			message: medicationDetailsResponse.error
				? medicationDetailsResponse.message
				: "",
			medicationDetails: medicationDetailsResponse.medication,
		}));
	}, [medicationDetailsResponse, setMedicationState]);

	const [showAddToServiceModal, setShowAddToServiceModal] = useState(false);

	const [showEditMedicationModal, setShowEditMedicationModal] = useState(false);

	return (
		<div className={styles.medication_details}>
			<SizedBox height="30px" />

			<div className={styles.top}>
				<GoBackButton path={"/dashboard/medications"} />

				<IconButton
					extraStyle={styles.edit_profile_button}
					label="Edit details"
					// suffixIcon={<IconEditProfile />}
					onClick={() => setShowEditMedicationModal(true)}
				/>
			</div>

			<SizedBox height="30px" />

			<div className={styles.header}>
				<div className={styles.title}>
					{medicationState.medicationDetails.name}
				</div>
				<div className={styles.capsule}>
					{medicationState.medicationDetails.category}
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.detail}>
					<span className={styles.detailTitle}>Prescriber:</span>
					<span className={styles.detailValue}>
						{medicationState.medicationDetails.prescriber}
					</span>
				</div>

				<div className={styles.detail}>
					<span className={styles.detailTitle}>Pharmacy:</span>
					<span className={styles.detailValue}>
						{medicationState.medicationDetails.pharmarcy}
					</span>
				</div>

				<div className={styles.detail}>
					<span className={styles.detailTitle}>Route of Administration:</span>
					<span className={styles.detailValue}>
						{medicationState.medicationDetails.route}
					</span>
				</div>

				<div className={styles.detail}>
					<span className={styles.detailTitle}>Indications:</span>
					<span className={styles.detailValue}>
						{...medicationState.medicationDetails.indications}
					</span>
				</div>

				<div className={styles.detail}>
					<span className={styles.detailTitle}>Strength:</span>
					<span className={styles.detailValue}>
						{medicationState.medicationDetails.strength}
					</span>
				</div>

				<div className={styles.detail}>
					<span className={styles.detailTitle}>Provider:</span>
					<span className={styles.detailValue}>
						{...medicationState.medicationDetails.providers}
					</span>
				</div>

				<div className={styles.details}>
					<label className={styles.instructions}>Instructions</label>
					<p>{medicationState.medicationDetails.instructions}</p>
				</div>
			</div>

			{showEditMedicationModal ? (
				<EditMedicationModal
					closeModal={() => setShowEditMedicationModal(false)}
				/>
			) : null}

			{showAddToServiceModal ? (
				<AddMedicationToServiceModal
					closeModal={() => setShowAddToServiceModal(false)}
				/>
			) : null}
		</div>
	);
}


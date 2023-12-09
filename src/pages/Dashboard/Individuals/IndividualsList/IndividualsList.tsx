import styles from "./individualslist.module.css";
import { useEffect, useState } from "react";
// import AddNewIndividualModal from "./AddNewIndividualModal";
import { useIndividualState } from "src/features/Individual/state";
import IndividualsListHeader from "./IndividualsListHeader";
import IndividualsListTable from "./IndividualsListTable";
import { useFetchIndividualListSelector } from "src/features/Individual/selector";
import AddNewIndividualModal from "./AddNewIndividualModal";

export default function IndividualsList() {
	const [individualState, setIndividualState] = useIndividualState();
	const individualListResponse = useFetchIndividualListSelector(
		individualState.individuals.currentListPage
	);

	const [isNewIndividualModalVisible, setIsNewIndividualModalVisible] =
		useState(false);

	useEffect(() => {
		if(!individualState.individuals.list.length) {
			setIndividualState((state) => {
				return {
					...state,
					error: individualListResponse.error,
					message: individualListResponse.message,
					individuals: individualListResponse.individuals,
				};
			});
		}

		return () => {
			setIndividualState((state) => {
				return {
					...state,
					status: "IDLE",
					error: false,
				};
			});
		};
	}, [individualListResponse, individualState.individuals.list.length, setIndividualState]);

	return (
		<div className={styles.staff_list}>
			<IndividualsListHeader
				showNewStaffModal={() => setIsNewIndividualModalVisible(true)}
			/>

			<IndividualsListTable
				individuals={individualState.individuals.list}
				currentPage={individualState.individuals.currentListPage}
				totalPages={individualState.individuals.totalListPages}
				goToPage={(pageNumber) => setIndividualState(state => ({
					...state, 
					individuals: {
						...state.individuals,
						currentListPage: pageNumber
					}
				}))}
				errorMessage={individualState.message}
			/>

			{isNewIndividualModalVisible ? (
				<AddNewIndividualModal
					closeModal={() => setIsNewIndividualModalVisible(false)}
				/>
			) : null}
		</div>
	);
}
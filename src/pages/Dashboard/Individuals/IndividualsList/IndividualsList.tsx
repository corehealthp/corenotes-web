import styles from "./individualslist.module.css";
import { useEffect, useState } from "react";
// import AddNewIndividualModal from "./AddNewIndividualModal";
import { useIndividualState } from "src/features/Individual/state";
import IndividualsListHeader from "./IndividualsListHeader";
import IndividualsListTable from "./IndividualsListTable";
// import { useFetchIndividualListSelector } from "src/features/Individual/selector";
import AddNewIndividualModal from "./AddNewIndividualModal";
import { getFetch } from "src/lib/fetch";

export default function IndividualsList() {
  const [individualState, setIndividualState] = useIndividualState();
//   const individualListResponse = useFetchIndividualListSelector(
//     individualState.individuals.currentListPage
//   );

  const [isNewIndividualModalVisible, setIsNewIndividualModalVisible] =
    useState(false);

  // useEffect(() => {
  // 	if(!individualState.individuals.list.length) {
  // 		setIndividualState((state:any) => {
  // 			return {
  // 				...state,
  // 				error: individualListResponse.error,
  // 				message: individualListResponse.message,
  // 				individuals: individualListResponse.individuals,
  // 			};
  // 		});
  // 	}

  // 	return () => {
  // 		setIndividualState((state:any) => {
  // 			return {
  // 				...state,
  // 				status: "IDLE",
  // 				error: false,
  // 			};
  // 		});
  // 	};
  // }, [individualListResponse, individualState.individuals.list.length, setIndividualState]);

  useEffect(() => {
    getFetch(`/individuals/get-all-individuals`).then((response: any) => {
      const individualDetailsResponse = response?.data;
      if (individualDetailsResponse) {

        setIndividualState((state:any) => ({
          ...state,
          status: "SUCCESS",
          message: "New individual added successfully",
          individuals: {
            ...state.individuals,
            list: individualDetailsResponse?.individuals,
            currentListPage: response.data.currentListPage,
            totalListPages: response.data.totalListPages,
            total: response.data.total,
          },
          newIndividual: individualState.newIndividual,
          error: false,
        }));
      }
    });
  }, []);

  return (
    <div className={styles.staff_list}>
      <IndividualsListHeader
        showNewStaffModal={() => setIsNewIndividualModalVisible(true)}
        individualLists={individualState?.individuals?.list}
      />

      <IndividualsListTable
        individuals={individualState?.individuals?.list}
        // currentPage={individualState.individuals.currentListPage}
        // totalPages={individualState.individuals.totalListPages}
        // goToPage={(pageNumber) => setIndividualState((state:any) => ({
        // 	...state,
        // 	individuals: {
        // 		...state.individuals,
        // 		currentListPage: pageNumber
        // 	}
        // }))}
        // errorMessage={individualState.message}
      />

      {isNewIndividualModalVisible ? (
        <AddNewIndividualModal
          closeModal={() => setIsNewIndividualModalVisible(false)}
        />
      ) : null}
    </div>
  );
}

import { useFetchIndividualServicesList } from "src/features/Individual/selector";
import styles from "./individualserviceslist.module.css";
import { useParams } from "react-router-dom";
import { useIndividualState } from "src/features/Individual/state";
import { useEffect, useState } from "react";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import AddIndividualServiceModal from "./AddIndividualServiceModal/AddIndividualServiceModel";
import DataLoadingError from "src/components/DataLoadingError";
import IndividualServiceCard from "./IndividualServiceCard";
import GridList from "src/components/GridList/GridList";
import { getFetch } from "src/lib/apiCalls";

export default function IndividualServicesList() {
  const { individualId } = useParams();

  const [individualState, setIndividualState] = useIndividualState();


  const individualServicesResponse = useFetchIndividualServicesList(
    individualId!
  );

  useEffect(() => {
    getFetch(`/individuals/${individualId}/services`).then((response: any) => {
      const fetchServicesListResponse =
        response?.data?.data?.individualServices;
      if (fetchServicesListResponse) {
        // setAssessmentState(fetchAssessmentsListResponse);
        setIndividualState((state: any) => ({
          ...state,
          message: individualServicesResponse.message,
          error: individualServicesResponse.error,
          services: fetchServicesListResponse,
        }));
      }
    });
  }, [individualId]);

  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  return (
    <div className={styles.individual_services_list}>
      <div className={styles.options}>
        <AddNewNoBackgroundIconButton
          label={"Assign Service"}
          action={() => setShowAddServiceModal(true)}
        />
      </div>

      {individualState.services.length ? (
        <GridList columnCount={2}>
          {individualState?.services.map((service: any) => {
            return (
              <IndividualServiceCard
                key={service.id}
                title={service.title}
                refName={service.refName}
                category={service.category}
                frequency={service.frequency}
                time={service.time}
              />
            );
          })}
        </GridList>
      ) : (
        <DataLoadingError message={"There are no services to show"} />
      )}

      {showAddServiceModal ? (
        <AddIndividualServiceModal
          closeModal={() => setShowAddServiceModal(false)}
        />
      ) : null}
    </div>
  );
}

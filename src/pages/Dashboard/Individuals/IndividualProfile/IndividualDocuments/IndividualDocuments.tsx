import { useEffect, useState } from "react";
import IndividualProfileHeader from "../IndividualProfileHeader";
import styles from "./individualdocuments.module.css";
import UploadDocModal from "./UploadDocModal";
import { useParams } from "react-router-dom";
import { useIndividualState } from "src/features/Individual/state";
import { useFetchIndividualDocumentsSelector } from "src/features/Individual/selector";
import IndividualDocumentsTable from "./IndividualDocumentsTable";

export default function IndividualDocuments() {
  const params = useParams();

  const [individualState, setIndividualState] = useIndividualState();

  const individualDocumentsRespose = useFetchIndividualDocumentsSelector(
    params.individualId!,
    individualState.documents.currentPage
  );

  useEffect(() => {
    setIndividualState((state) => {
      return {
        ...state,
        status: "IDLE",
        error: individualDocumentsRespose.error,
        documents: individualDocumentsRespose.data,
      };
    });
  }, [setIndividualState, individualDocumentsRespose]);

  const [isUploadDocModalVisible, setIsUploadDocModalVisible] = useState(false);

  return (
    <div className={styles.staff_documents}>
      <IndividualProfileHeader
        actionType="upload-doc"
        clickAction={() => setIsUploadDocModalVisible(true)}
      />

      <IndividualDocumentsTable
        documents={individualState.documents.list}
        currentPage={individualState.documents.currentPage}
        totalPages={individualState.documents.totalPages}
        errorMessage={
          individualState.error ? individualState.message : "No documents found"
        }
        goToPage={(pageNumber: number) => console.log(pageNumber)}
        
      />

      {isUploadDocModalVisible ? (
        <UploadDocModal
          closeModal={() => setIsUploadDocModalVisible(false)}
          
        />
      ) : null}
    </div>
  );
}

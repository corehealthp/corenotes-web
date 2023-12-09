import { useEffect, useState } from "react";
import StaffProfileHeader from "../StaffProfileHeader";
import styles from "./staffdocuments.module.css";
import UploadDocModal from "./UploadDocModal";
import StaffDocumentsTable from "./StaffDocumentsTable";
import { useFetchStaffDocumentsSelector } from "src/features/staff/selector";
import { useParams } from "react-router-dom";
import { useStaffState } from "src/features/staff/state";

export default function StaffDocuments() {

    const params = useParams();

    const [staffState, setStaffState] = useStaffState();

    const staffDocumentsRespose = useFetchStaffDocumentsSelector(params.staffId!, staffState.documents.currentPage)

    useEffect(()=> {
        if(!staffState.documents.list.length) {
            setStaffState(state => {
                return {
                    ...state,
                    status:'IDLE',
                    error: staffDocumentsRespose.error,
                    documents: staffDocumentsRespose.data
                }
            })
        }

    }, [setStaffState, staffDocumentsRespose.data, staffDocumentsRespose.error, staffState.documents.list.length])

    const [isUploadDocModalVisible, setIsUploadDocModalVisible] = useState(false)

    return (
        <div className={styles.staff_documents}>
            <StaffProfileHeader 
                actionType='upload-doc'
                clickAction={()=> setIsUploadDocModalVisible(true)}
            />

            <StaffDocumentsTable
                documents={staffState.documents.list}
                currentPage={staffState.documents.currentPage}
                totalPages={staffState.documents.totalPages}
                errorMessage={staffState.error ?staffState.message :"No documents found"} 
                goToPage={(pageNumber:number)=> console.log(pageNumber)}
            />

            {
                isUploadDocModalVisible
                ?   <UploadDocModal 
                        closeModal={()=> setIsUploadDocModalVisible(false)} 
                    />
                :   null
            }
        </div>
    );
}
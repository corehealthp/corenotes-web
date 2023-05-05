import StaffListTable from "./StaffListTable";
import styles from "./stafflist.module.css";
import { useEffect, useState } from "react";
import { useFetchStaffListSelector } from "src/features/staff/selector";
import { useStaffState } from "src/features/staff/state";
import StaffListHeader from "./StaffListHeader/StaffListHeader";
import AddNewStaffModal from "./AddNewStaffModal";

export default function StaffList() {

    const [staffState, setStaffState] = useStaffState();
    const staffsListResponse = useFetchStaffListSelector(staffState.currentPage);

    const [isNewStaffModalVisible, setIsNewStaffModalVisible] = useState(false)

    useEffect(()=> {
        if(!staffsListResponse.error) {
            setStaffState((state)=> {
                return {
                    ...state,
                    status: 'SUCCESS',
                    error: false,
                    message: staffsListResponse.message,
                    list: staffsListResponse.staffs
                }
            })
        } else {
            setStaffState((state)=> {
                return {
                    ...state,
                    status: 'FAILED',
                    error: true,
                    message: staffsListResponse.message
                }
            })
        }
    }, [staffsListResponse, setStaffState])

    return (
        <div className={styles.staff_list}>
            
            <StaffListHeader  
                showNewStaffModal={()=> setIsNewStaffModalVisible(true)}
            />

            <StaffListTable
                staffs={staffState.list}
                currentPage={0} 
                totalPages={0} 
                goToPage={(pageNumber:number)=> console.log(pageNumber)} 
                errorMessage={staffState.message}
            />

            {
                isNewStaffModalVisible
                ?   <AddNewStaffModal 
                        closeModal={()=> setIsNewStaffModalVisible(false)}
                    />
                :   null
            }
        </div>
    )
}
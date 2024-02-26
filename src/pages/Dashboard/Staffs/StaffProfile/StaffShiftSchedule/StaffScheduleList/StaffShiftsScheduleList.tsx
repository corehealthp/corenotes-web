import styles from "./staffshiftsschedulelist.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchStaffShiftsSelector } from "src/features/staff/selector";
import { useStaffState } from "src/features/staff/state";
import StaffShiftsScheduleTable from "./StaffScheduleTable";
import { createGlobalFeedback } from "src/features/globalFeedback/atom";

export default function StaffShiftScheduleList () {

    const params = useParams();

    const [staffState, setStaffState] = useStaffState();
    
    const staffShiftsResponse = useFetchStaffShiftsSelector(parseInt(params.staffId!), staffState.shifts.currentPage);

    useEffect(()=> {
        setStaffState((state)=> ({
            ...state,
            shifts: staffShiftsResponse.data
        }))

        if(staffShiftsResponse.error) createGlobalFeedback("error", staffShiftsResponse.message)

    }, [setStaffState, staffShiftsResponse])
    
    return (
        <div className={styles.list}>
            <StaffShiftsScheduleTable 
                shifts={staffState.shifts.list}
                currentPage={staffState.documents.currentPage}
                totalPages={staffState.documents.totalPages}
                errorMessage={staffState.error ?staffState.message :"No shifts schedule found for staff"} 
                goToPage={(pageNumber:number)=> console.log(pageNumber)}

            />
        </div>
    );
}
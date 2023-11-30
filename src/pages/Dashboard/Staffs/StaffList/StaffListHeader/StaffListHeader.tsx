import { useStaffValue } from "src/features/staff/state"
import styles from "./stafflistheader.module.css"
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";

export default function StaffListHeader({
    showNewStaffModal
}:{ showNewStaffModal: ()=> void }){

    const staffState = useStaffValue();

    return (
        <div className={styles.staff_list_header}>
            <div className={styles.heading}>
                { staffState.totalStaffs } Staff{staffState.list.length > 1 ?"s" :""} total
            </div>

            <AddNewNoBackgroundIconButton 
                label="Add new staff"
                action={showNewStaffModal} 
            />  
        </div>
    )
}
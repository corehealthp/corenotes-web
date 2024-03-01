import { Link } from "react-router-dom";
import styles from "./individualslistheader.module.css"
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { useIndividualStateValue } from "src/features/Individual/state";

export default function IndividualsListHeader({
    showNewStaffModal,
    individualLists
}:{ showNewStaffModal: ()=> void,individualLists:any}){

    const individualState = useIndividualStateValue();

    return (
        <div className={styles.staff_list_header}>
            <div className={styles.heading}>
                { individualLists?.length } individual{individualState.individuals.length > 1 ?"s" :""} total
            </div>

            <div className={styles.actions}>
                <Link to={"assessments"} className={styles.nav_link}>Assessments</Link>

                <AddNewNoBackgroundIconButton 
                    label="Add new individual"
                    action={()=> showNewStaffModal()} 
                />  
            </div>
        </div>
    )
}
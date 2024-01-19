import styles from "./staffworkinformation.module.css";
import { InfoField } from "../StaffPersonalInformation/StaffPersonalInformation";
import { useStaffValue } from "src/features/staff/state";

export default function StaffWorkInformation() {

    const staffState = useStaffValue();

    const workInfo = [
        {
            label:'Provider role',
            value: staffState.details.providerRole
        },
        {
            label:'Username',
            value:staffState.details.username
        },
        {
            label:'Employee ID',
            value:staffState.details.employeeId
        },
        {
            label:'Schedule type',
            value:staffState.details.jobSchedule
        },
        {
            label:'Hire date',
            value:staffState.details.hiredAt
        }
    ]

    return (
        <div className={styles.staff_work_information}>
            <div className={styles.heading}>Work Information</div>

            <div className={styles.info_section}>
                {
                    workInfo.map((info, index) => {
                        return  <InfoField
                                    key={info.label + index}
                                    label={info.label} 
                                    value={info.value} 
                                />
                    })
                }
            </div>
        </div>
    )
}
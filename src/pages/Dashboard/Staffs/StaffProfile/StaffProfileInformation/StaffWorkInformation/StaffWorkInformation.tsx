import styles from "./staffworkinformation.module.css";
import { InfoField } from "../StaffPersonalInformation/StaffPersonalInformation";
import { staffInitState, useStaffState } from "src/features/staff/state";
import { useEffect } from "react";
import { fetchStaffRoleDetailsAction } from "src/features/staff/actions";

export default function StaffWorkInformation() {

    // const staffState = useStaffValue();
    const [staffState, setStaffState] = useStaffState();
    useEffect(()=> {
        fetchStaffRoleDetailsAction(staffState.details.providerRole!)
        .then((response)=> {
            setStaffState((state:any) => ({
                ...state,
                roleDetails: response.data.staffRoleDetails,
            }))
        })
        .catch((error)=> {
            console.log(error)
            setStaffState((state:any) => ({
                ...state,
                roleDetails: staffInitState.roleDetails
            }))
        })

    }, [staffState.details.providerRole, setStaffState])

    
    const workInfo = [
        {
            label:'Provider role',
            value: staffState?.roleDetails?.title
        },
        {
            label:'Username',
            value:staffState.details.username
        },
        // {
        //     label:'Employee ID',
        //     value:staffState.details.employeeId
        // },
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
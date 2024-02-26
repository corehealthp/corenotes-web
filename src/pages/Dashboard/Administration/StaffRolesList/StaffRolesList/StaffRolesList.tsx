import { useStaffState } from "src/features/staff/state"
import styles from "./staffroleslist.module.css"
import GridList from "src/components/GridList/GridList";
import StaffRoleCard from "./StaffRoleCard";
import { useEffect } from "react";
import { useFetchStaffRoleSelector } from "src/features/staff/selector";

export default function StaffRolesList() {

    const [staffState, setStaffState] = useStaffState();

    const staffRolesResponse = useFetchStaffRoleSelector(staffState.roles.currentPage)

    useEffect(()=> {
        setStaffState(state => ({
            ...state,
            error: staffRolesResponse.error,
            message: staffRolesResponse.message,
            roles: {
                list: staffRolesResponse.data.staffRoles,
                currentPage: staffRolesResponse.data.currentPage,
                totalPages: staffRolesResponse.data.totalPages,
            }
        }))

    }, [setStaffState, staffRolesResponse])

    return (
        <div className={styles.requested_services_list}>
            <GridList columnCount={3}>
                {
                    staffState.roles.list?.map((role)=> {
                        return  <StaffRoleCard
                                    key={role.id}
                                    id={role.id} 
                                    title={role.title}
                                    staffCount={role.staffCount}
                                />
                    })
                }
            </GridList>
        </div>
    )
}
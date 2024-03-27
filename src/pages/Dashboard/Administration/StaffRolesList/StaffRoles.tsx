import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import styles from "./staffroles.module.css";
import { useEffect, useState } from "react";
import AddStaffRoleModal from "./AddStaffRoleModal";
import StaffRolesList from "./StaffRolesList";
import { getFetch } from "src/lib/apiCalls";

export default function StaffRoles() {

    const [showCreateStaffRolesModal, setShowCreateStaffRolesModal] = useState(false)
    const [staffRoles, setStaffRoles]=useState<any>()
    useEffect(() => {
        getFetch(`/staffs/roles`).then((response: any) => {
          const staffRolesResponse = response;
          if (staffRolesResponse) {
            setStaffRoles(staffRolesResponse?.data)
            console.log(staffRolesResponse)
          }
        });
      }, [staffRoles]);
    return (
        <div className={styles.staff_offices_list}>
            <div className={styles.heading}>
                <div className={styles.title}>Staff roles</div>

                <AddNewNoBackgroundIconButton 
                    label="Add role"
                    action={()=> setShowCreateStaffRolesModal(true)}
                />
            </div>

            <StaffRolesList 
            staffRoles={staffRoles}
            />

            {
                showCreateStaffRolesModal
                ?   <AddStaffRoleModal setStaffRoles={setStaffRoles} setShowCreateStaffRolesModal={setShowCreateStaffRolesModal} />
                :   null
            }
        </div>
    )
}
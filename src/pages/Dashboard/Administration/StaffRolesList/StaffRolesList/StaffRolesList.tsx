import { useStaffState } from "src/features/staff/state"
import styles from "./staffroleslist.module.css"
import GridList from "src/components/GridList/GridList";
import StaffRoleCard from "./StaffRoleCard";
import { useEffect } from "react";
// import { useFetchStaffRoleSelector } from "src/features/staff/selector";
import { getFetch } from "src/lib/apiCalls";

export default function StaffRolesList() {

    const [staffState, setStaffState] = useStaffState();

    // const staffRolesResponse = useFetchStaffRoleSelector()

 

useEffect(() => {
    getFetch(`/staffs/roles`).then((response: any) => {
      const staffRolesResponse = response;
      if (staffRolesResponse) {
        setStaffState((state:any) => ({
          ...state,
          status: "SUCCESS",
          // list: staffRolesResponse,
          roles: {
            ...state.roles,
            list: staffRolesResponse,
          },
        }));
      }
    });
  }, [staffState]);
    return (
        <div className={styles.requested_services_list}>
            <GridList columnCount={3}>
                {
                    //@ts-ignore
                    staffState?.roles?.list?.data?.map((role:any)=> {
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
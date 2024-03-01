import styles from "./staffroleslist.module.css";
import GridList from "src/components/GridList/GridList";
import StaffRoleCard from "./StaffRoleCard";
// import { useFetchStaffRoleSelector } from "src/features/staff/selector";

export default function StaffRolesList({ staffRoles }: any) {
  // const [staffState, setStaffState] = useStaffState();

  return (
    <div className={styles.requested_services_list}>
      <GridList columnCount={3}>
        {
          //@ts-ignore
          staffRoles?.map((role: any) => {
            return (
              <StaffRoleCard
                key={role.id}
                id={role.id}
                title={role.title}
                staffCount={role.staffCount}
              />
            );
          })
        }
      </GridList>
    </div>
  );
}

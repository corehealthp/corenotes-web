import styles from "./staffshiftsschedulelist.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StaffShiftsScheduleTable from "./StaffScheduleTable";
import { getFetch } from "src/lib/apiCalls";

export default function StaffShiftScheduleList() {
  const params = useParams();

//   const [staffState, setStaffState] = useStaffState();
  const [staffShiftState, setStaffShiftState] = useState<any>();

  useEffect(() => {
    getFetch(`/staffs/shifts/${params.staffId}`).then((response: any) => {
      const staffDetailsResponse = response?.data;
      if (staffDetailsResponse) {
        setStaffShiftState(staffDetailsResponse);
      }
    });
  }, []);
  return (
    <div className={styles.list}>
      <StaffShiftsScheduleTable shifts={staffShiftState||[]} />
    </div>
  );
}

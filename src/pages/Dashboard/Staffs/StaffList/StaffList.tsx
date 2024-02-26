import StaffListTable from "./StaffListTable";
import styles from "./stafflist.module.css";
import { useEffect, useState } from "react";
// import { useFetchStaffListSelector } from "src/features/staff/selector";
import { useStaffState } from "src/features/staff/state";
import StaffListHeader from "./StaffListHeader/StaffListHeader";
import AddNewStaffModal from "./AddNewStaffModal";
// import formatStaffList from "src/features/staff/utils/formatStaffsList";
import { getFetch } from "src/lib/apiCalls";

export default function StaffList() {

  const [staffState, setStaffState] = useStaffState();
  // const staffsListResponse = useFetchStaffListSelector(staffState.currentPage);

  const [isNewStaffModalVisible, setIsNewStaffModalVisible] = useState(false);

  useEffect(() => {
    getFetch(`/staffs/get-all-staff`).then((response: any) => {
      const staffDetailsResponse = response?.data;
      if (staffDetailsResponse) {
        setStaffState((state) => ({
          ...state,
          status: "SUCCESS",
          list: staffDetailsResponse,
        }));
      }
    });
  }, [staffState?.list?.length, setStaffState]);
  
  return (
    <div className={styles.staff_list}>
      <StaffListHeader
        showNewStaffModal={() => setIsNewStaffModalVisible(true)}
      />

      <StaffListTable
        staffs={staffState.list}
    
      />

      {isNewStaffModalVisible ? (
        <AddNewStaffModal closeModal={() => setIsNewStaffModalVisible(false)} />
      ) : null}
    </div>
  );
}

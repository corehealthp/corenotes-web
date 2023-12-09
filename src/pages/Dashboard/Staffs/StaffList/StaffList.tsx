import StaffListTable from "./StaffListTable";
import styles from "./stafflist.module.css";
import { useEffect, useState } from "react";
import { useFetchStaffListSelector } from "src/features/staff/selector";
import { useStaffState } from "src/features/staff/state";
import StaffListHeader from "./StaffListHeader/StaffListHeader";
import AddNewStaffModal from "./AddNewStaffModal";
import formatStaffList from "src/features/staff/utils/formatStaffsList";

export default function StaffList() {

  const [staffState, setStaffState] = useStaffState();
  const staffsListResponse = useFetchStaffListSelector(staffState.currentPage);

  const [isNewStaffModalVisible, setIsNewStaffModalVisible] = useState(false);

  useEffect(() => {
    if (!staffsListResponse.error) {
      if(!staffState.list.length) {
        setStaffState((state) => {
          return {
            ...state,
            status: "SUCCESS",
            error: false,
            message: staffsListResponse.message,
            list: staffsListResponse.staffs.staffs,
            currentPage: staffsListResponse.staffs.currentPage,
            totalPages: staffsListResponse.staffs.totalPages,
            totalStaffs: staffsListResponse.staffs.total
          };
        });
      }
    } else {
      setStaffState((state) => {
        return {
          ...state,
          status: "FAILED",
          error: true,
          message: staffsListResponse.message ?? "There was an error fetching staff list, please contact support",
        };
      });
    }
  }, [staffsListResponse, setStaffState, staffState.list.length]);

  return (
    <div className={styles.staff_list}>
      <StaffListHeader
        showNewStaffModal={() => setIsNewStaffModalVisible(true)}
      />

      <StaffListTable
        staffs={formatStaffList(staffState.list)}
        currentPage={staffState.currentPage}
        totalPages={staffState.totalPages}
        goToPage={(pageNumber) => setStaffState(state => ({...state, currentPage: pageNumber}))}
        errorMessage={staffState.message}
      />

      {isNewStaffModalVisible ? (
        <AddNewStaffModal closeModal={() => setIsNewStaffModalVisible(false)} />
      ) : null}
    </div>
  );
}

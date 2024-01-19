import ComponentLoader from "src/components/Loaders/ComponentLoader";
import styles from "./staffshiftsscheduletable.module.css";

import { columns } from "./table";
import { Table } from "antd";

export default function StaffShiftsScheduleTable({ shifts }: { shifts: any }) {


  return (
    <div className={styles.individual_services_list_table}>
      {!shifts.length ? (
        <ComponentLoader />
      ) : (
        <div className="mt-8">
          <Table columns={columns} dataSource={shifts} />
        </div>
      )}
    </div>
  );
}

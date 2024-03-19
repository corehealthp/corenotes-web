import styles from "./individualslisttable.module.css";

import { columns } from "./table";
import { Table } from "antd";

export default function IndividualsListTable({ individuals }: any) {
  return (
    <div className={styles.staff_list_table}>
      <Table columns={columns} dataSource={individuals} />
    </div>
  );
}

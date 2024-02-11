import styles from "./stafflisttable.module.css";
// import { useEffect, useState } from "react";
// import ComponentLoader from "src/components/Loaders/ComponentLoader";
// import UserImage from "src/components/ImageComponent/UserImage";

import { columns } from "./table";
import { Table } from "antd";

export default function StaffListTable({ staffs }: any) {

  return (
    <div className={styles.staff_list_table}>
      
        {/* <div> */}
          <Table columns={columns} dataSource={staffs}  />
        {/* </div> */}
      
    </div>
  );
}

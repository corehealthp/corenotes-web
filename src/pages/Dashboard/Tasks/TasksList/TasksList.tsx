// import { useFetchTasksListSelector } from "src/features/task/selector";
import styles from "./taskslist.module.css";
// import { useTaskState } from "src/features/task/state";
import {  useState } from "react";
import TasksListHeader from "./TasksListHeader";
// import TaskCard from "./TaskCard";
import SizedBox from "src/components/SizedBox";
// import MedicationCodeScannerModal from "src/components/Scanner/MedicationCodeScannerModal";
// import AddPRNMedicationModal from "../TaskDetails/AddPRNMedicationModal";
// import AddPRNServiceModal from "../TaskDetails/AddPRNServiceModal";
import { Table } from "antd";
import TaskModal from "src/components/TaskModal/taskModal";
import type { TableProps } from "antd";
import CapitalizeSentence from "src/utils/capitalizeSentence";
import { IoEllipsisVertical } from "react-icons/io5";



export default function TasksList() {
  const [isTaskOpen, setIsTaskOpen] = useState(false);

    const columns: TableProps<any>["columns"] = [
        {
          title: "Patient Name",
          dataIndex: "fullname",
          key: "fullname",
          render: (text, record) => (
            <div className="text-xs font-semibold flex items-center gap-2 w-[160px] overflow-clip">
              <div className="bg-green-700 flex items-center justify-center h-8 w-8 p-3 rounded-full text-white">
                <h1 className={`text-[18px] ` + text}>{`${record?.firstname
                  .toUpperCase()
                  .charAt(0)}`}</h1>
              </div>
              <p className="w-full  text-xs">{`${CapitalizeSentence(
                record?.firstname
              )} ${record?.lastname ? CapitalizeSentence(record?.lastname) : ""}`}</p>
            </div>
          ),
        },
      
        {
          title: "Service Type",
          dataIndex: "age",
          key: "age",
          align: "left",
      
          render: (text, _record) => (
            <div className="  w-[130px]">
              <span className="text-xs font-semibold">{text || 0}</span>
            </div>
          ),
        },
        {
          title: "Assigned To",
          dataIndex: "gender",
          key: "gender",
          align:"left",
          render: (text, _record) => (
            <div className="w-[120px]">
              <span className="text-xs font-semibold">{CapitalizeSentence(text)|| "nill"}</span>
            </div>
          ),
        },
        {
          title: "Date and Time",
          dataIndex: "compartment",
          key: "compartment",
          render: (text, _record) => (
            <div className="w-[120px]">
              <span className="text-xs font-semibold">{CapitalizeSentence(text)}</span>
            </div>
          ),
        },
        {
          title: "Status",
          dataIndex: "medicaidNumber",
          key: "medicaidNumber",
          render: (text, _record) => (
            <div className="w-[100px]">
              <span className="text-[12px] font-semibold">{text|| "nill"}</span>
            </div>
          ),
        },
      
        {
          title: "Action",
          dataIndex: "individualId",
          key: "individualId",
          render: (_text, _record) => (
            <span className="w-[80px] cursor-pointer" onClick={()=>setIsTaskOpen(true)}><IoEllipsisVertical/></span>
          ),
        },
      ];


  const individuals = [
    {
      id: "65680c9b086f91a30566cfe2",
      individualId: 11,
      profileImage:
        "https://res.cloudinary.com/the-shawn-exchange/image/upload/v1671833458/user-profile_jsze9h.webp",
      firstname: "Wayne",
      lastname: "Adams",
      age: "Provided",
      gender: "Nurses",
      medicaidNumber: "Completed",
      compartment: "20/11/2023 : 15:00",
    },
    {
      id: "656a8009ecd2611196a6f394",
      individualId: 14,
      profileImage:
        "https://res.cloudinary.com/the-shawn-exchange/image/upload/v1671833458/user-profile_jsze9h.webp",
      firstname: "MARQUEZ",
      lastname: "DAVIS",
      age: "Provided",
      gender: "Doctor",
      medicaidNumber: "Pending",
      compartment: "20/11/2023 : 15:00",
    },
    {
      id: "656a83c9ecd2611196a6f467",
      individualId: 15,
      profileImage:
        "https://res.cloudinary.com/the-shawn-exchange/image/upload/v1671833458/user-profile_jsze9h.webp",
      firstname: "PHILLIP",
      lastname: "GREESON",
      age: "Provided",
      gender: "DSP",
      medicaidNumber: "Completed",
      compartment: "20/11/2023 : 15:00",
    },
    {
      id: "656b1d0eecd2611196a6fd9d",
      individualId: 16,
      profileImage:
        "https://res.cloudinary.com/the-shawn-exchange/image/upload/v1671833458/user-profile_jsze9h.webp",
      firstname: "Boston",
      lastname: "May",
      age: "Requested",
      gender: "RN",
      medicaidNumber: "Pending",
      compartment: "20/11/2023 : 15:00",
    },
    {
      id: "656a6401ecd2611196a6f0c3",
      individualId: 12,
      profileImage:
        "https://res.cloudinary.com/the-shawn-exchange/image/upload/v1671833458/user-profile_jsze9h.webp",
      firstname: "JARRED",
      lastname: "BAXTER",
      age: "Provided",
      gender: "LNP",
      medicaidNumber: "Pending",
      compartment: "20/11/2023 : 15:00",
    },
    {
      id: "656a755becd2611196a6f322",
      individualId: 13,
      profileImage:
        "https://res.cloudinary.com/the-shawn-exchange/image/upload/v1671833458/user-profile_jsze9h.webp",
      firstname: "WENDY",
      lastname: "BRACKETT",
      age: "Provided",
      gender: "LPR",
      medicaidNumber: "Pending",
      compartment: "20/11/2023 : 15:00",
    },
  ];
  return (
    <div className={styles.tasks_list_page}>
      <TasksListHeader />

      <SizedBox height="50px" />

      <Table columns={columns} dataSource={individuals} />

      <TaskModal isTaskOpen={isTaskOpen} setIsTaskOpen={setIsTaskOpen} />
    </div>
  );
}

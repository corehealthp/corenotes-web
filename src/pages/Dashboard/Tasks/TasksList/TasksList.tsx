// import { useFetchTasksListSelector } from "src/features/task/selector";
import styles from "./taskslist.module.css";
// import { useTaskState } from "src/features/task/state";
import { useEffect, useState } from "react";
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
import { getFetch } from "src/lib/apiCalls";
import moment from "moment";
import TaskActionModal from "src/components/TaskModal/taskActionOption";
import EditTaskModal from "src/components/TaskModal/editTaskModal";
import ViewTaskModal from "src/components/TaskModal/viewTaskModal";

export default function TasksList() {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isViewTaskOpen, setIsViewTaskOpen] = useState(false);

  const [isTaskActionOpen, setIsTaskActionOpen] = useState(false);
  const [patient, setPatient] = useState<any>({});

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
          )} ${
            record?.lastname ? CapitalizeSentence(record?.lastname) : ""
          }`}</p>
        </div>
      ),
    },

    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      align: "left",

      render: (text, _record) => (
        <div className="  w-[130px]">
          <span className="text-xs font-semibold">{text || 0}</span>
        </div>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "staffTitle",
      key: "staffTitle",
      align: "left",
      render: (text, _record) => (
        <div className="w-[120px]">
          <span className="text-xs font-semibold">
            {text?.toUpperCase() || "nill"}
          </span>
        </div>
      ),
    },
    {
      title: "Date and Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, _record) => (
        <div className="w-[140px]">
          <span className="text-[11px] font-semibold">
            {moment(text).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, _record) => (
        <div className="w-[120px]">
          {text === "pending" ? (
            <span className="text-[12px] font-semibold bg-[#fce3c4] rounded-xl py-1 px-2">
              {text || "nill"}
            </span>
          ) : (
            <span className="text-[12px] font-semibold bg-[#b5daf6] rounded-xl py-1 px-2 ">
              {text || "nill"}
            </span>
          )}
        </div>
      ),
    },

    {
      title: "Action",
      // dataIndex: "individualId",
      // key: "individualId",
      render: (_text, record) => (
        <span
          className="w-[80px] cursor-pointer"
          onClick={() => {
            setIsTaskActionOpen(true);
            setPatient(record);
          }}
        >
          <IoEllipsisVertical />
        </span>
      ),
    },
  ];

  const [tasks, setTasks] = useState<any>();
  useEffect(() => {
    getFetch(`/tasks`).then((response: any) => {
      const staffDetailsResponse = response?.data;

      setTasks(staffDetailsResponse);
    });
  }, []);

  return (
    <div className={styles.tasks_list_page}>
      <TasksListHeader tasks={tasks} />

      <SizedBox height="50px" />

      <Table columns={columns} dataSource={tasks} />

      <TaskModal
        patient={patient}
        isTaskOpen={isTaskOpen}
        setIsTaskOpen={setIsTaskOpen}
        setTasks={setTasks}
      />
      <TaskActionModal
        setIsTaskOpen={setIsTaskOpen}
        isTaskActionOpen={isTaskActionOpen}
        setIsEditTaskOpen={setIsEditTaskOpen}
        setIsViewTaskOpen={setIsViewTaskOpen}
        setIsTaskActionOpen={setIsTaskActionOpen}
      />
      <EditTaskModal
        patient={patient}
        isEditTaskOpen={isEditTaskOpen}
        setIsEditTaskOpen={setIsEditTaskOpen}
        setTasks={setTasks}
      />

      <ViewTaskModal
        patient={patient}
        isViewTaskOpen={isViewTaskOpen}
        setIsViewTaskOpen={setIsViewTaskOpen}
        setTasks={setTasks}
      />
    </div>
  );
}

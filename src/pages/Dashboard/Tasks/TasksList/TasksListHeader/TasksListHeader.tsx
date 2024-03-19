// import styles from "./taskslistheader.module.css";
// import { useTaskStateValue } from "src/features/task/state";
// import { ReactComponent as IconBarcodeScanner } from "src/assets/icons/icon-barcode-scanner.svg";
// import { useState } from "react";
// import SizedBox from "src/components/SizedBox";
// import { FaList, FaPills, FaPlus } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { BsClock } from "react-icons/bs";
import { BiTaskX } from "react-icons/bi";
export default function TasksListHeader() {
  return (
    <div className="">
        <h2 className="mb-4 font-semibold text-lg">Overview</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex items-center gap-2 bg-[#FFF7F1] p-5 rounded-md shadow-md">
          <div className="bg-[#e8a557] p-2 rounded">
            <FiUsers className="text-3xl text-white" />
          </div>

          <div className="flex flex-col gap-0">
            <h2 className="m-0 text-2xl font-semibold">80</h2>
            <p className="m-0">Total Patients</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#ecf4e7] p-5 rounded-md shadow-md">
          <div className="bg-[#69aa3d] p-2 rounded">
            <BsClock className="text-3xl text-white" />
          </div>

          <div className="flex flex-col gap-0">
            <h2 className="m-0 text-2xl font-semibold">69</h2>
            <p className="m-0">Completed Tasks</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#dbf0ff] p-5 rounded-md shadow-md">
          <div className="bg-[#0f87e3] p-2 rounded">
            <BiTaskX className="text-3xl text-white" />
          </div>

          <div className="flex flex-col gap-0">
            <h2 className="m-0 text-2xl font-semibold">36</h2>
            <p className="m-0">Uncompleted Tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { TableProps } from "antd";
import IndividualViewProfileButton from "./IndividualViewProfileButton";
export const columns: TableProps<any>["columns"] = [
  {
    title: "Full Name",
    dataIndex: "fullname",
    key: "fullname",
    render: (text, record) => (
      <div className="text-xs font-semibold flex items-center gap-3">
        <div className="bg-green-700 p-4 flex items-center justify-center h-10 w-10 rounded-full text-white">
          <h1 className={`text-xl `+ text}>{`${record?.firstname.toUpperCase().charAt(0)}`}</h1>
        </div>
        <p>{`${record?.firstname.toUpperCase()} ${record?.lastname ? record?.lastname.toUpperCase() : ''}`}</p>
      </div>
    ),
  },
  
  

  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    align: "left",

    render: (text, _record) => (
      <span className="text-xs font-semibold">{text}</span>
    ),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    render: (text, _record) => (
      <span className="text-xs font-semibold">{text}</span>
    ),
  },
  {
    title: "Compartment",
    dataIndex: "compartment",
    key: "compartment",
    render: (text, _record) => (
      <span className="text-xs font-semibold">{text}</span>
    ),
  },
  {
    title: "Medicaid",
    dataIndex: "medicaidNumber",
    key: "medicaidNumber",
    render: (text, _record) => (
      <span className="text-xs font-semibold">{text}</span>
    ),
  },

  {
    title: "View Profile",
    dataIndex: "individualId",
    key: "individualId",
    render: (text, _record) => (
      <IndividualViewProfileButton individualId={text} />
    ),
  },
];

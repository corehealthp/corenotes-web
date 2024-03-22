import type { TableProps } from "antd";
import IndividualViewProfileButton from "./IndividualViewProfileButton";
import CapitalizeSentence from "src/utils/capitalizeSentence";
export const columns: TableProps<any>["columns"] = [
  {
    title: "Full Name",
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
    title: "Age",
    dataIndex: "age",
    key: "age",

    render: (text, _record) => (
      <div className="  w-[120px]">
        <span className="text-xs font-semibold">{text || 0}</span>
      </div>
    ),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    align:"left",
    render: (text, _record) => (
      <div className="w-[100px]">
        <span className="text-xs font-semibold">{`${text
            .toUpperCase()
            .charAt(0)}`||"Nill"}</span>
      </div>
    ),
  },
  {
    title: "Compartment",
    dataIndex: "compartment",
    key: "compartment",
    render: (text, _record) => (
      <div className="w-[170px]">
        <span className="text-xs font-semibold">{CapitalizeSentence(text)}</span>
      </div>
    ),
  },
  {
    title: "Medicaid",
    dataIndex: "medicaidNumber",
    key: "medicaidNumber",
    render: (text, _record) => (
      <div className="w-[150px]">
        <span className="text-[12px] font-semibold">{text|| "nill"}</span>
      </div>
    ),
  },

  {
    title: "Profile",
    dataIndex: "individualId",
    key: "individualId",
    render: (text, _record) => (
      <div className="w-[140px]">

        <IndividualViewProfileButton individualId={text} />
      </div>
    ),
  },
];

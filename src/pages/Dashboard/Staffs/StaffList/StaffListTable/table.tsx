import type { TableProps } from "antd";
import moment from "moment";
import StaffViewProfileButton from "./StaffViewProfileButton";
import CapitalizeSentence from "src/utils/capitalizeSentence";
export const columns: TableProps<any>["columns"] = [
  {
    title: "Full Name",
    dataIndex: "firstname",
    key: "firstname",
    render: (text, record) => (
      <div className="text-xs  font-semibold flex items-center gap-3 w-[180px]">
        <div className="bg-green-700 p-3 flex items-center justify-center h-8 w-8 rounded-full text-white">
          <h1 className="text-lg">{`${text.toUpperCase().charAt(0)}`}</h1>
        </div>
        <p>{`${CapitalizeSentence(record.firstname)} ${CapitalizeSentence(record.lastname)}`}</p>
      </div>
    ),
  },
  // {
  //   title: "Role",
  //   dataIndex: "providerRole",
  //   key: "providerRole",
  //   render: (text) => <span className="text-xs font-semibold">{text.title}</span>,
  // },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    align: "left",

    render: (text, _record) => (
      <div className="w-[180px]">

        <span className="text-xs font-semibold">{text?.work}</span>
      </div>
    ),
  },
  {
    title: "Last Seen",
    dataIndex: "lastSeen",
    key: "lastSeen",
    render: (text, _record) => (
      <span className="text-xs font-semibold w-[200px]">
        {moment(text).format("YYYY-MM-DD HH:mm:ss")}
      </span>
    ),
  },
  {
    title: "Status",
    dataIndex: "active",
    key: "active",
    render: (active) => (
      <span className={`w-[140px] text-xs font-semibold ${active ? 'text-green-500' : 'text-red-500'}`}>
        {active ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    title: "Profile",
    dataIndex: "_id",
    key: "_id",
    render: (text, _record) => (
      <div className="w-[150px]">

        <StaffViewProfileButton id={text} />
      </div>
    )
    
  },
];

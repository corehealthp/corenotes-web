import type { TableProps } from "antd";
import moment from "moment";
import StaffViewProfileButton from "./StaffViewProfileButton";

export const columns: TableProps<any>["columns"] = [
  {
    title: "Full Name",
    dataIndex: "firstname",
    key: "firstname",
    render: (text, record) => (
      <div className="text-xs font-semibold flex items-center gap-3">
        <div className="bg-green-700 p-4 flex items-center justify-center h-10 w-10 rounded-full text-white">
          <h1 className="text-xl">{`${text.toUpperCase().charAt(0)}`}</h1>
        </div>
        <p>{`${record.firstname.toUpperCase()} ${record.lastname.toUpperCase()}`}</p>
      </div>
    ),
  },
  {
    title: "Role",
    dataIndex: "providerRole",
    key: "providerRole",
    render: (text) => <span className="text-xs font-semibold">{text}</span>,
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    render: (text, _record) => (
      <span className="text-xs font-semibold">{text.work}</span>
    ),
  },
  {
    title: "Last Seen",
    dataIndex: "lastSeen",
    key: "lastSeen",
    render: (text, _record) => (
      <span className="text-xs font-semibold">
        {moment(text).format("YYYY-MM-DD HH:mm:ss")}
      </span>
    ),
  },
  {
    title: "Profile",
    dataIndex: "_id",
    key: "_id",
    render: (text, _record) => (
      <StaffViewProfileButton id={text} />
    )
    
  },
];

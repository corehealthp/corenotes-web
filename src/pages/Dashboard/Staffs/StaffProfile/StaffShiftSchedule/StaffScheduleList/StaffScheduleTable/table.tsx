import type { TableProps } from "antd";
import moment from "moment";

export const columns: TableProps<any>["columns"] = [
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => (
      <span className="text-xs font-semibold">{moment(text).format("l")}</span>
    ),
  },
  {
    title: "Shift From",
    dataIndex: "from",
    key: "from",
    render: (text) => (
      <span className="text-xs font-semibold">
        {moment(text, "HH:mm").format("hh:mm A")}
      </span>
    ),
  },
  {
    title: "Shift To",
    dataIndex: "to",
    key: "to",
    render: (text) => (
      <span className="text-xs font-semibold">
        {moment(text, "HH:mm").format("hh:mm A")}
      </span>
    ),
  },
  {
    title: "Duration Spent",
    // dataIndex: "to",
    key: "duration",
    render: (_text, record) => {
      const startTime = moment(record.createdAt);
      const endTime = moment(record.updatedAt);
      const durationInMinutes = endTime.diff(startTime, "minutes");
  
      if (durationInMinutes < 60) {
          return (
              <span className="text-xs font-semibold">
                  {durationInMinutes} mins
              </span>
          );
      } else {
          const hours = Math.floor(durationInMinutes / 60);
          const minutes = durationInMinutes % 60;
          return (
              <span className="text-xs font-semibold">
                  {hours} hr {minutes} mins
              </span>
          );
      }
  }
  },
  {
    title: "Clock In At",
    dataIndex: "startAt",
    key: "startAt",
    render: (text) => (
      <span className="text-xs font-semibold">
        {moment(text).format("lll")}
      </span>
    ),
  },
  {
    title: "Clock Out At",
    dataIndex: "EndAt",
    key: "EndAt",
    render: (text) => (
      <span className="text-xs font-semibold">
        {moment(text).format("lll")}
      </span>
    ),
  },
  {
    title: "Notes",
    dataIndex: "comment",
    key: "comment",
  },
];

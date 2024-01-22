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
      // const durationInHours = moment(record.updatedAt, "HH:mm").diff(moment(record.createdAt), 'hours', true);
      const startTime = moment(record.createdAt);
      const endTime = moment(record.updatedAt);

      const durationInHours = endTime.diff(startTime, "hours", true);
      return (
        <span className="text-xs font-semibold">
          {durationInHours.toFixed(2)} hrs
        </span>
      );
    },
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
    dataIndex: "updatedAt",
    key: "updatedAt",
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

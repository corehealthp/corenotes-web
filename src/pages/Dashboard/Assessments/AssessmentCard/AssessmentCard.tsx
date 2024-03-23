import { Link } from "react-router-dom";
import styles from "./assessmentcard.module.css";

interface AssessmentCardProps {
  title?: string;
  category?: string;
  status?: string;
  questionsCount?: number;
  assessmentType?: string;
  path?: string;
  openAction?: () => void;
}

export default function AssessmentCard({
  title,
  // category,
  // status,
  // questionsCount,
  // assessmentType,
  path,
  openAction,
}: AssessmentCardProps) {
  return (
    <Link
      to={`assessment/${path}`}
      className="bg-white py-[25px] px-[16px] cursor-pointer rounded-md border-blue-200  border-l-4 shadow-md "
      onClick={openAction}
    >
      <div className={styles.category}>assessment</div>

      <div className={styles.title}>{title}</div>
      <div className={styles.questions_count}>questions</div>

      {status ? <div className={styles.status}>{status}</div> : null}
    </Link>
  );
}

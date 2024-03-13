// import GoBackButton from "src/components/Buttons/GoBackButton";
// import styles from "./assessmentdetails.module.css";
// import { useFetchAssessmentDetailsResponse } from "src/features/assessment/selector";
import { Link, useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { useAssessmentState } from "src/features/assessment/state";
// import DataLoadingError from "src/components/DataLoadingError";
// import GridList from "src/components/GridList/GridList";
// import AssessmentQuestion from "../AssessmentQuestion";
import DdpOversightReview from "src/components/Assessments/DdpOversightReview";
import NursesNote from "src/components/Assessments/NursesNote";
import { FaChevronLeft } from "react-icons/fa";
import RNOversightMonthly from "src/components/Assessments/RNOversightMonthly";

export default function AssessmentDetails() {
  const params = useParams();

  console.log(params);

//   const [assessmentState, setAssessmentState] = useAssessmentState();

//   const assessmentDetailsResponse = useFetchAssessmentDetailsResponse(
//     params.assessmentId!
//   );

//   useEffect(() => {
//     console.log(assessmentDetailsResponse.assessment);
//     setAssessmentState((state) => ({
//       ...state,
//       error: assessmentDetailsResponse.error,
//       assessmentDetails: assessmentDetailsResponse.assessment,
//     }));
//   }, [assessmentDetailsResponse, setAssessmentState]);

  return (
    <>
      <div className="flex gap-2 items-center text-md mb-12">
        <label htmlFor="">Assessment</label>
        <Link to={"/dashboard/individuals/assessments"}><FaChevronLeft/></Link>
        <label htmlFor="" className="text-[#0A66D3] ">{params?.title?.toUpperCase()}</label>
      </div>
      {params?.title === "ddp oversight review" && <DdpOversightReview />}
      {params?.title === "nurse notes" && <NursesNote />}
      {params?.title === "rn oversight - monthly" && <RNOversightMonthly />}
    </>
  );
}

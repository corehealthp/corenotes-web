import GoBackButton from "src/components/Buttons/GoBackButton";
import styles from "./assessmentslist.module.css";
// import { useAssessmentState } from "src/features/assessment/state";
// import { useFetchAssessmentsListSelector } from "src/features/assessment/selector";
import { useEffect, useState } from "react";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { useNavigate } from "react-router-dom";
import AssessmentCard from "../AssessmentCard/AssessmentCard";
import DataLoadingError from "src/components/DataLoadingError";
import UploadAssessmentModal from "../UploadAssessmentModal";
import { getFetch } from "src/lib/apiCalls";

export default function AssessmentsList() {
  const navigate = useNavigate();

  const [showUploadAssessmentModal, setShowUploadAssessmentModal] =
    useState(false);

  // const [assessmentState, setAssessmentState] = useAssessmentState();
  const [assessmentState, setAssessmentState] = useState<any>();

  useEffect(() => {
    getFetch(`/assessments`).then((response: any) => {
      const fetchAssessmentsListResponse = response?.data;
      if (fetchAssessmentsListResponse) {
        setAssessmentState(fetchAssessmentsListResponse)
  }})
  }, []);

  // const assessments = [
  //   {
  //     id: 1,
  //     title: "Health & Safety",
  //     tag: "assessment",
  //   },
  //   {
  //     id: 2,
  //     title: "DDP Oversight Review",
  //     tag: "assessment",
  //   },

  //   {
  //     id: 3,
  //     title: "RN Oversight - Monthly",
  //     tag: "assessment",
  //   },
  //   {
  //     id: 4,
  //     title: "Nurse Notes",
  //     tag: "assessment",
  //   },
  //   {
  //     id: 5,
  //     title: "Monthly Education for all medications prescribed",
  //     tag: "assessment",
  //   },
  //   {
  //     id: 6,
  //     title: "Modification Review - Monthly",
  //     tag: "assessment",
  //   },
  //   {
  //     id: 7,
  //     title:"Abnormal Involuntary Movement Scale (AIMS) - Frequency Of Documentation: Every 4 months ",
  //     tag: "assessment",
  //   },
  //   {
  //       id: 8,
  //       title:"HRST Log – monthly documentation",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 9,
  //       title:"Informed Choice",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 11,
  //       title:"Documents",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 12,
  //       title:"Monthly Supply Notes",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 13,
  //       title:"PRN Provided Services",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 14,
  //       title:"Incident Report",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 15,
  //       title:"Quality Improvement Audit",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 16,
  //       title:"Patient Satisfactory Survey",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 17,
  //       title:"Annual Guardanship Review",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 18,
  //       title:"Complaints and Grieviances Logs",
  //       tag: "assessment",
  //     },
  //     {
  //       id: 19,
  //       title:"Informed Choice /Annual Rights Review",
  //       tag: "assessment",
  //     },
  // ];
  return (
    <div className={styles.assessemts_list_page}>
      <GoBackButton path={"/dashboard/individuals"} />

      <div className={styles.header}>
        <div className={styles.title}>All Assessments</div>

        <div>
          <AddNewNoBackgroundIconButton
            label="Upload assessment"
            action={() => setShowUploadAssessmentModal(true)}
          />

          <AddNewNoBackgroundIconButton
            label="Create assessment"
            action={() => navigate({ pathname: "create" })}
          />
        </div>
      </div>

      <div className={styles.assessments_list}>
        <div className="grid grid-cols-2 gap-10">
          {assessmentState ? (
            
            assessmentState?.map((assessment: any, i: any) => {
              return (
                // <Link to={`assessment/${assessment.title}`}>
                  <>
                    <AssessmentCard
                      title={assessment.title}
                      key={i}
                      // category={assessment.category}
                      // questionsCount={assessment.questionsCount}
                      // assessmentType={assessment.assessmentType}
                      // path={assessment.assessmentId}
                    />
                  </>
                // </Link>
              );
            })
          ) : (
            <DataLoadingError message="There are no assessments to show" />
          )}
        </div>
      </div>

      {showUploadAssessmentModal ? (
        <UploadAssessmentModal
          closeModal={() => setShowUploadAssessmentModal(false)}
        />
      ) : null}
    </div>
  );
}

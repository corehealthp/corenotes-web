import GoBackButton from "src/components/Buttons/GoBackButton";
import styles from "./assessmentslist.module.css"
import { useAssessmentState } from "src/features/assessment/state";
import { useFetchAssessmentsListSelector } from "src/features/assessment/selector";
import { useEffect, useState } from "react";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import { useNavigate } from "react-router-dom";
import AssessmentCard from "../AssessmentCard/AssessmentCard";
import DataLoadingError from "src/components/DataLoadingError";
import GridList from "src/components/GridList/GridList";
import UploadAssessmentModal from "../UploadAssessmentModal";

export default function AssessmentsList() {

    const navigate = useNavigate();

    const [showUploadAssessmentModal, setShowUploadAssessmentModal] = useState(false);

    const [assessmentState, setAssessmentState] = useAssessmentState();
    
    const fetchAssessmentsListResponse = useFetchAssessmentsListSelector(assessmentState.assessments.currentPage);

    useEffect(()=> {
        console.log(fetchAssessmentsListResponse)
        setAssessmentState(state => ({
            ...state,
            error: fetchAssessmentsListResponse.error,
            message: fetchAssessmentsListResponse.message,
            assessments: fetchAssessmentsListResponse.assessments
        }))

    }, [fetchAssessmentsListResponse, setAssessmentState])

    return (
        <div className={styles.assessemts_list_page}>
            <GoBackButton path={"/dashboard/individuals"} />

            <div className={styles.header}>
                <div className={styles.title}>All Assessments</div>

                <div>
                    <AddNewNoBackgroundIconButton 
                        label="Upload assessment"
                        action={()=> setShowUploadAssessmentModal(true)} 
                    />

                    <AddNewNoBackgroundIconButton 
                        label="Create assessment"
                        action={()=> navigate({pathname: 'create'})} 
                    />
                </div>

            </div>

            <div className={styles.assessments_list}>
                <GridList columnCount={2}>
                    {
                        assessmentState.assessments.list.length
                        ?   assessmentState.assessments.list.map( (assessment) => {
                                return  <AssessmentCard
                                            key={assessment.id}
                                            title={assessment.title}
                                            category={assessment.category} 
                                            questionsCount={assessment.questionsCount}
                                            assessmentType={assessment.assessmentType}
                                            path={assessment.assessmentId}                     
                                        />
                                    
                            })
                        :   <DataLoadingError message="There are no assessments to show" />
                    }
                </GridList>
            </div>

            {
                showUploadAssessmentModal
                ?   <UploadAssessmentModal 
                        closeModal={()=> setShowUploadAssessmentModal(false)}
                    />
                :   null
            }
        </div>
    );
}
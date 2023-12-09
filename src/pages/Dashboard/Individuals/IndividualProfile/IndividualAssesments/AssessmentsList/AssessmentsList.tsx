import styles from "./assessmentslist.module.css";
import { useEffect, useState } from "react";
import { useIndividualState } from "src/features/Individual/state";
import AssessmentCard from "../../../../Assessments/AssessmentCard";
import GridList from "src/components/GridList/GridList";
import AssessmentSessionModal from "../AssessmentSession/AssessmentSessionModal";
import { useFetchIndividualAssessmentsList } from "src/features/Individual/selector";
import { useParams } from "react-router-dom";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import AddIndividualAssessmentModal from "./AddIndividualAssessmentModal";

export default function AssessmentsList() {
	const params = useParams();

	const [individualState, setIndividualState] = useIndividualState();

	const [addAssessmentModal, setShowAddAssessmentModal] = useState<boolean>(false);

	const assessmentsResponse = useFetchIndividualAssessmentsList(
		parseInt(params.individualId!),
		individualState.assessments.currentPage
	);

	useEffect(() => {
		if (!assessmentsResponse.error) {
			if(!individualState.assessments.list.length) {
				setIndividualState((state) => ({
					...state,
					assessments: {
						...state.assessments,
						...assessmentsResponse.individualAssessments,
					},
				}));
			}
		}

		return () => {
			setIndividualState((state) => {
				return {
					...state,
					status: "IDLE",
					error: false,
				};
			});
		};
	}, [assessmentsResponse, individualState.assessments.list.length, setIndividualState]);

	const [isAssessmentModalVisible, setIsAssessmentModalVisible] = useState(false);
	const [assessmentSessionId, setAssessmentSessionId] = useState("");

	function toggleTakeAssessmentModal(assessmentObjId: string) {
		setAssessmentSessionId(assessmentObjId);

		setIsAssessmentModalVisible(true);
	}

	return (
		<div className={styles.assessment_list}>
			<div className={styles.options}>
                <AddNewNoBackgroundIconButton 
                    label={"Add Assessment"}
                    action={()=> setShowAddAssessmentModal(true)}
                />
            </div>

			{
				addAssessmentModal
				?	<AddIndividualAssessmentModal closeModal={()=> setShowAddAssessmentModal(false)} />
				:	null
			}
			
			<GridList columnCount={3}>
				{individualState.assessments.list.map((assessment) => {
					return (
						<AssessmentCard
							key={assessment.id}
							category={assessment.category}
							title={assessment.title}
							questionsCount={assessment.questionCount}
							assessmentType={assessment.assessmentType}
							status={assessment.status}
							openAction={() => toggleTakeAssessmentModal(assessment.id)}
						/>
					);
				})}
			</GridList>

			{isAssessmentModalVisible ? (
				<AssessmentSessionModal
					assessmentSessionId={assessmentSessionId}
					closeModal={() => setIsAssessmentModalVisible(false)}
				/>
			) : null}
		</div>
	);
}
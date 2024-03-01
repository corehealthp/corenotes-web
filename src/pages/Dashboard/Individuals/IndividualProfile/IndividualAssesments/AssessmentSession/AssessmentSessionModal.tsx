import styles from "./assessmentsessionmodal.module.css";
import ModalContainer from "src/components/Modal/ModalContainer";
import { ReactComponent as IconCancelCircle } from "src/assets/icons/icon-cancel-circle.svg";
import { useIndividualState } from "src/features/Individual/state";
import PrimaryTextButton from "src/components/Buttons/PrimaryTextButton";
import { useFetchIndividualAssessmentSession } from "src/features/Individual/selector";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import GridList from "src/components/GridList/GridList";
import { completeAssessmentSessionAction } from "src/features/Individual/action";

export default function AssessmentSessionModal({ assessmentSessionId, closeModal }:{ assessmentSessionId:string,  closeModal:()=> void }) {

    const params = useParams()

    const [individualState, setIndividualState] = useIndividualState();
    const [completeAssessmentState, setCompleteAssessmentState] = useState(individualState);

    const assessmentSessionResponse = useFetchIndividualAssessmentSession(parseInt(params.individualId!), assessmentSessionId);

    useEffect(()=> {
        
        setIndividualState((state:any) => ({
            ...state,
            assessments: {
                ...state.assessments,
                session: assessmentSessionResponse.assessmentSession
            }
        }))
    }, [assessmentSessionResponse.assessmentSession, setIndividualState])

    function selectAnswer(value:string, questionId:string) {
        const assessmentQuestions = [...individualState.assessments.session.questions];
        const questionIndex = assessmentQuestions.findIndex(question => question.id === questionId);
        assessmentQuestions[questionIndex] =  { ...assessmentQuestions[questionIndex], answer: value  };

        setIndividualState((state:any) => ({
            ...state,
            assessments: {
                ...state.assessments,
                session: {
                    ...state.assessments.session,
                    questions: [...assessmentQuestions]
                }
            }
        }))
        
        checkAssessmentCompletion()
    }

    function makeComment(value:string, questionId:string) {
        const assessmentQuestions = [...individualState.assessments.session.questions];
        const questionIndex = assessmentQuestions.findIndex(question => question.id === questionId);
        assessmentQuestions[questionIndex] =  { ...assessmentQuestions[questionIndex], comment: value  };

        setIndividualState((state:any) => ({
            ...state,
            assessments: {
                ...state.assessments,
                session: {
                    ...state.assessments.session,
                    questions: assessmentQuestions
                }
            }
        }))

        checkAssessmentCompletion()
    }

    const [isAssessmentComplete, setIsAssessmentComplete] = useState(false)

    function checkAssessmentCompletion() {
        const answeredQuestions = individualState.assessments.session?.questions.filter((question:any) => question.answer).length;

        if(answeredQuestions === individualState.assessments.session?.questions.length) {
            setIsAssessmentComplete(true)
        } else {
            setIsAssessmentComplete(false)
        }
    }

    function completeAssessmentSession() {
        if(isAssessmentComplete) {
            const payload = {
                questions: individualState.assessments.session!.questions
            }

            setCompleteAssessmentState((state:any) => ({
                ...state,
                status: "LOADING",
                message: "",
                error: false
            }))

            completeAssessmentSessionAction(parseInt(params.individualId!), assessmentSessionId, payload)
            .then((response)=> {
                setCompleteAssessmentState((state:any) => ({
                    ...state,
                    status: "SUCCESS",
                    message: "",
                    error: false
                }))

                setIndividualState((state:any) => {
                    return {
                        ...state,
                        status:'SUCCESS',
                        message:'Assessment session completed successfully',
                        assessments: {
                            ...state.assessments,
                            session: {
                                ...state.assessments.session!,
                                status:'COMPLETED',
                                questions: response.data.assessmentSession.questions,
                            }
                        }
                    }
                })
            })
            .catch((error)=> {
                setCompleteAssessmentState((state:any) => ({
                    ...state,
                    status: "SUCCESS",
                    message: "",
                    error: false
                }))

                setIndividualState((state:any) => {
                    return {
                        ...state,
                        status:'FAILED',
                        error: true,
                        message: error.message ?? "There was an error saving session, try again"
                    }
                })
            })
        }
    }
    
    return (
        <ModalContainer>
            <div className={styles.assessment_session}>
                <div className={styles.header}>
                    <div className={styles.heading}>
                        <div className={styles.title}>{ individualState.assessments.session.title }</div>
                        <div className={styles.status}>{individualState.assessments.session.status}</div>
                    </div>
                    <IconCancelCircle onClick={()=> individualState.status === 'LOADING' ?()=>({}) :closeModal() }/>
                </div>

                <div className={styles.body}>
                    <GridList columnCount={2}>
                        {
                            individualState.assessments.session.questions.map(({sessionQuestion, index}:any)=> {
                                return (
                                    <QuestionCard 
                                        key={sessionQuestion.id}
                                        position={index + 1} 
                                        question={sessionQuestion.question} 
                                        answer={sessionQuestion.answer} 
                                        comment={sessionQuestion.comment}
                                        optionSelectAction={(value:string)=> selectAnswer(value, sessionQuestion.id)} 
                                        commentAction={(value:string)=> makeComment(value, sessionQuestion.id)}
                                    />
                                )
                            })
                        } 
                    </GridList>
                </div>

                <div className={styles.buttons}>
                    <PrimaryTextButton
                        isLoading={completeAssessmentState.status === 'LOADING'}
                        disabled={!isAssessmentComplete}
                        width={"20%"}
                        label="Submit"
                        backgroundColor="green"

                        clickAction={()=> completeAssessmentSession()}
                    />
                </div>
            </div>
        </ModalContainer>
    );
}
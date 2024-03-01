import { useEffect, useState } from "react";
import styles from "./goaltrackingservice.module.css";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import AddNewGoalModal from "./AddNewGoalModal";
import { useIndividualState } from "src/features/Individual/state";
import GoalServiceCard from "./GoalServiceCard/GoalServiceCard";
import { useFetchIndividualGoalsList } from "src/features/Individual/selector";
import { useParams } from "react-router-dom";
import DataLoadingError from "src/components/DataLoadingError";
import SizedBox from "src/components/SizedBox";
import GridList from "src/components/GridList/GridList";

export default function GoalTrackingService() {

    const params = useParams();
    const individualId = parseInt(params.individualId!)

    const [individualState, setIndividualState] = useIndividualState();
    
    const [showAddNewGoalModal, setShowAddNewGoalModal] = useState(false);

    const fetchGoalsTrackingServiceResponse = useFetchIndividualGoalsList(individualId, individualState.goalServices.currentPage);

    useEffect(()=> {
        setIndividualState((state:any) => ({
            ...state,
            error: fetchGoalsTrackingServiceResponse.error,
            message: fetchGoalsTrackingServiceResponse.message,
            goalServices: fetchGoalsTrackingServiceResponse.goals
        }))

    }, [fetchGoalsTrackingServiceResponse, setIndividualState])

    return (
        <div className={styles.goal_tracking_service}>
            <div className={styles.header}>
                <div className={styles.title}>Goal Tracking</div>
                
                <div className={styles.actions}>
                    <AddNewNoBackgroundIconButton 
                        label="Add new goal"
                        action={()=> setShowAddNewGoalModal(true)}
                    />
                </div>
            </div>

            <div className={styles.goals_list}>
                <SizedBox height="50px"/>
                {
                    individualState.goalServices.list.length
                    ?   <GridList columnCount={3}>
                            {
                                individualState.goalServices.list?.map((goalService:any)=> {
                                    return  <GoalServiceCard
                                                key={goalService.id}
                                                objective={goalService.objective}
                                                method={goalService.method}
                                                frequency={goalService.frequency}
                                                time={goalService.time}
                                            />
                                })
                            }
                        </GridList>
                    :   <DataLoadingError message={"No goals have been set"} />
                }
            </div>

            {
                showAddNewGoalModal
                ?   <AddNewGoalModal closeModal={()=> setShowAddNewGoalModal(false)} />
                :   null
            }
        </div>
    )
}
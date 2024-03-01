import { useEffect, useState } from "react";
import styles from "./dailylivingactivitiesservice.module.css";
import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import AddNewDailyLivingActivityModal from "./AddNewDailyLivingActivityModal";
import { useIndividualState } from "src/features/Individual/state";
import DailyLivingActivityServiceCard from "./DailyLivingActivityServiceCard/DailyLivingActivityServiceCard";
import { useFetchIndividualDailyLivingActivitiesList } from "src/features/Individual/selector";
import { useParams } from "react-router-dom";
import DataLoadingError from "src/components/DataLoadingError";
import SizedBox from "src/components/SizedBox";
import GridList from "src/components/GridList/GridList";

export default function DailyLivingActivitiesService() {

    const params = useParams();
    const individualId = parseInt(params.individualId!)

    const [individualState, setIndividualState] = useIndividualState();
    
    const [showAddNewDailyLivingActivityModal, setShowAddNewDailyLivingActivityModal] = useState(false);

    const fetchDailyLivingActivityServiceResponse = useFetchIndividualDailyLivingActivitiesList(individualId, individualState.dailyLivingActivities.currentPage);

    useEffect(()=> {
        setIndividualState((state:any) => ({
            ...state,
            error: fetchDailyLivingActivityServiceResponse.error,
            message: fetchDailyLivingActivityServiceResponse.message,
            dailyLivingActivities: fetchDailyLivingActivityServiceResponse.dailyLivingActivities
        }))

    }, [fetchDailyLivingActivityServiceResponse, setIndividualState])

    return (
        <div className={styles.goal_tracking_service}>
            <div className={styles.header}>
                <div className={styles.title}>Daily living activities</div>
                
                <div className={styles.actions}>
                    <AddNewNoBackgroundIconButton
                        label="Add new activity"
                        action={()=> setShowAddNewDailyLivingActivityModal(true)}
                    />
                </div>
            </div>

            <div className={styles.goals_list}>
                <SizedBox height="50px"/>
                {  
                    individualState.dailyLivingActivities.list?.length
                    ?   <GridList columnCount={3}>
                            {
                                individualState.dailyLivingActivities.list?.map((dailyActivity:any)=> {
                                    return  <DailyLivingActivityServiceCard
                                                key={dailyActivity.id}
                                                title={dailyActivity.title}
                                                frequency={dailyActivity.frequency}
                                                time={dailyActivity.time}
                                            />
                                })
                            }
                        </GridList>
                    :   <DataLoadingError message={"No activity have been set"} />
                }
            </div>

            {
                showAddNewDailyLivingActivityModal
                ?   <AddNewDailyLivingActivityModal closeModal={()=> setShowAddNewDailyLivingActivityModal(false)} />
                :   null
            }
        </div>
    )
}
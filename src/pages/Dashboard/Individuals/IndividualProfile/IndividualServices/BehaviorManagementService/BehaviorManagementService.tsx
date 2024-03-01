import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import styles from "./behaviormanagementservice.module.css";
import { useEffect, useState } from "react";
import AddNewBehaviorModal from "./AddNewBehaviorModal";
import { useFetchIndividualBehaviorManangementServicesSelector } from "src/features/Individual/selector";
import { useParams } from "react-router-dom";
import { useIndividualState } from "src/features/Individual/state";
import BehaviorManagementServiceCard from "./BehaviorManagementServiceCard";
import GridList from "src/components/GridList/GridList";

export default function BehaviorManagementService() {

    const params = useParams();

    const [individualState, setIndividualState] = useIndividualState();
    
    const fetchBehaviorManagementServicesResponse = useFetchIndividualBehaviorManangementServicesSelector(parseInt(params.individualId!), individualState.behaviorsServices.currentPage);

    useEffect(()=> {
        setIndividualState((state:any) => ({
            ...state,
            behaviorsServices: fetchBehaviorManagementServicesResponse.behaviorManagementServices
        }))
    }, [fetchBehaviorManagementServicesResponse, setIndividualState])

    const [showAddNewBehaviorModal, setShowAddNewBehaviorModal] = useState(false);

    return (
        <div className={styles.behavior_management_service}>
            <div className={styles.header}>
                <div className={styles.title}>Behavior management service</div>
                
                <div className={styles.actions}>
                    <AddNewNoBackgroundIconButton 
                        label="Add new behavior"
                        action={()=> setShowAddNewBehaviorModal(true)}
                    />
                </div>
            </div>

            <div className={styles.behavior_management_service}>
                <GridList columnCount={3}>
                    {
                        individualState.behaviorsServices.list.map((behaviorService:any)=> (
                            <BehaviorManagementServiceCard
                                key={behaviorService.id}
                                description={behaviorService.description}
                                time={behaviorService.time}
                                frequency={behaviorService.frequency}
                            />
                        ))
                    }
                </GridList>
            </div>

            {
                showAddNewBehaviorModal
                ?   <AddNewBehaviorModal closeModal={()=> setShowAddNewBehaviorModal(false)} />
                :   null
            }
        </div>
    )
}
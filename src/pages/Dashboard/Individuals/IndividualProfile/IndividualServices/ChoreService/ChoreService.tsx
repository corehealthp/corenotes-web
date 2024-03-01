import AddNewNoBackgroundIconButton from "src/components/Buttons/AddNewNoBackgroundIconButton";
import styles from "./choreservice.module.css";
import { useEffect, useState } from "react";
import { useFetchIndividualChoreServicesSelector } from "src/features/Individual/selector";
import { useParams } from "react-router-dom";
import { useIndividualState } from "src/features/Individual/state";
import GridList from "src/components/GridList/GridList";
import ChoreServiceCard from "./ChoreServiceCard";
import AddNewChoreModal from "./AddNewChoreModal";

export default function ChoreService() {

    const params = useParams();

    const [individualState, setIndividualState] = useIndividualState();
    
    const fetchChoreServicesResponse = useFetchIndividualChoreServicesSelector(parseInt(params.individualId!), individualState.choreServices.currentPage);

    useEffect(()=> {
        setIndividualState((state:any) => ({
            ...state,
            choreServices: fetchChoreServicesResponse.choreServices
        }))
    }, [fetchChoreServicesResponse, setIndividualState])

    const [showAddNewChoreModal, setShowAddNewChoreModal] = useState(false);

    return (
        <div className={styles.chore_management_service}>
            <div className={styles.header}>
                <div className={styles.title}>Chore service</div>
                
                <div className={styles.actions}>
                    <AddNewNoBackgroundIconButton 
                        label="Add new chore"
                        action={()=> setShowAddNewChoreModal(true)}
                    />
                </div>
            </div>

            <div className={styles.chore_management_service}>
                <GridList columnCount={3}>
                    {
                        individualState.choreServices.list.map((choreService:any)=> (
                            <ChoreServiceCard
                                key={choreService.id}
                                description={choreService.description}
                                time={choreService.time}
                                frequency={choreService.frequency}
                            />
                        ))
                    }
                </GridList>
            </div>

            {
                showAddNewChoreModal
                ?   <AddNewChoreModal closeModal={()=> setShowAddNewChoreModal(false)} />
                :   null
            }
        </div>
    )
}
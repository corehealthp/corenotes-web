import { useFetchTasksListSelector } from "src/features/task/selector";
import styles from "./taskslist.module.css";
import { useTaskState } from "src/features/task/state";
import { useEffect, useState } from "react";
import TasksListHeader from "./TasksListHeader";
import TaskCard from "./TaskCard";
import SizedBox from "src/components/SizedBox";
import MedicationCodeScannerModal from "src/components/Scanner/MedicationCodeScannerModal";
import AddPRNMedicationModal from "../TaskDetails/AddPRNMedicationModal";
import AddPRNServiceModal from "../TaskDetails/AddPRNServiceModal";

export default function TasksList() {
  const [taskState, setTaskState] = useTaskState();

  const fetchTasksListResponse = useFetchTasksListSelector(
    taskState.tasks.currentPage
  );

  useEffect(() => {
    setTaskState((state:any) => ({
      ...state,
      message: fetchTasksListResponse.message,
      error: fetchTasksListResponse.error,
      tasks: fetchTasksListResponse.tasks,
    }));
  }, [fetchTasksListResponse, setTaskState]);

    const [isScannerVisible, setIsScannerVisible] = useState(false);

    const [PRNModalVisible, setPRNModalVisible] = useState(false)

    const [PRNServiceModalVisible, setPRNServiceModalVisible] = useState(false)

    useEffect(()=> {
        setTaskState(state => ({
            ...state,
            message: fetchTasksListResponse.message,
            error: fetchTasksListResponse.error,
            tasks: fetchTasksListResponse.tasks
        }))

    }, [fetchTasksListResponse, setTaskState])

        
    return (
        <div className={styles.tasks_list_page}>
            <TasksListHeader 
                openBarcodeScanner={()=> setIsScannerVisible(true)}
                addPRNmed={()=> setPRNModalVisible(true)}
                addPRNService={()=> setPRNServiceModalVisible(true)}
            />
            
            <SizedBox height="50px" />
            
            <div className={styles.tasks_list}>
                {
                    taskState.tasks.list.map(task => {
                        return  <TaskCard 
                                    key={task.id}
                                    taskId={task.taskId}
                                    status={task.status} 
                                    service={task.service.title}
                                    description={task.desc}
                                    individual={{
                                        firstname: task.individual.firstname,
                                        lastname: task.individual.lastname,
                                        profileImage: task.individual.profileImage
                                    }} 
                                    schedule={{
                                        startAt: task.schedule.startAt,
                                        endAt: task.schedule.endAt
                                    }}       
                                />
                    })
                }
            </div>
            
            {
                isScannerVisible
                ?   <MedicationCodeScannerModal 
                        close={()=> setIsScannerVisible(false)}
                    />
                :   null
            }

            {
                PRNModalVisible
                ?   <AddPRNMedicationModal closeModal={()=> setPRNModalVisible(false)} />
                :   null
            }

            {
                PRNServiceModalVisible
                ?   <AddPRNServiceModal closeModal={()=> setPRNServiceModalVisible(false)} />
                :   null
            }
        </div>
    )
}

import { removeGlobalFeedback, useGlobalFeedbackStateValue } from "src/features/globalFeedback/atom";
import ErrorFeedback from "./ErrorFeedback";
import SuccessFeedback from "./SuccessFeedback";
import styles from "./globalfeedback.module.css"

export default function GlobalFeedback() {

    const globalFeedbacks = useGlobalFeedbackStateValue();
    
    return (
        <div className={styles.feedback_list_container}>
            {
                globalFeedbacks.map((feedback, index) => {
                    return feedback.status === "error"
                    ?   <ErrorFeedback 
                            key={index} 
                            message={feedback.message} 
                            timeOutInSecs={feedback.timeOutInSecs}
                            close={()=> removeGlobalFeedback(index)} 
                        />
                    :   <SuccessFeedback 
                            key={index} 
                            message={feedback.message} 
                            timeOutInSecs={feedback.timeOutInSecs}
                            close={()=> removeGlobalFeedback(index)} 
                        />
                })
            }
        </div>
    );
}
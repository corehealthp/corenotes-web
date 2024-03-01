import formatTime from "src/utils/formatTime";
import styles from "./supervisoryreviewhistorylist.module.css";
import { useIndividualStateValue } from "src/features/Individual/state";
import formatDate from "src/utils/formatDate";
import SizedBox from "src/components/SizedBox";
import PrintTextButton from "src/components/Buttons/PrintTextButton";
import GoBackButton from "src/components/Buttons/GoBackButton";

export default function SupervisoryReviewHistoryList({ closeHistory }:{closeHistory:()=> void}) {
    
    const individualState = useIndividualStateValue();
        
    return (
        <div className={styles.supervisory_review_history}>

            <GoBackButton path="" action={closeHistory} />

            <div className={styles.history}>History</div>
            
            <SizedBox height="10px" />
            {
                individualState.supervisoryMedicationReviews.list.length
                ?   individualState.supervisoryMedicationReviews.list.map((review:any) => {
                        return (
                            <div 
                                key={review.id}
                                className={styles.review}
                            >
                                <div className={styles.point}></div>
                                <div className={styles.content}>
                                    <div className={styles.date_time}>
                                        <div>{formatTime(review.reviewedAt.toString())}</div>
                                        <div>{formatDate(review.reviewedAt.toString())}</div>
                                    </div>

                                    <div className={styles.title}>
                                        <div className={styles.name}>{ review.signedBy.firstname + " " + review.signedBy.lastname }</div>
                                        <div className={styles.desc}>signed the review for</div>
                                        <div className={styles.month}>{ review.month }</div>
                                    </div>
                                    
                                    <SizedBox height="10px" />
                                    <PrintTextButton action={()=> ({})} />
                                </div>
                            </div>
                        )
                    })
                :   <div className={styles.empty_list}>No reviews made yet</div>
            }
        </div>
    )

}
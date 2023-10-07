import { Link } from "react-router-dom";
import styles from "./individualservicecard.module.css";
import { useIndividualStateValue } from "src/features/Individual/state";

interface IIndividualServiceCardProps {
    title:string;
    refName:string;
    category:string;
    frequency:string;
    time:string;
}

export default function IndividualServiceCard({
    title,
    refName,
    category,
    frequency,
    time
}:IIndividualServiceCardProps) {
    
    const individualState = useIndividualStateValue();

    return (
        <div className={styles.individual_service_card}>
            <div className={styles.title}> {title} </div>
            <div className={styles.individual_count}> {category} </div>
            <div className={styles.individual_count}> {frequency} </div>
            <div className={styles.individual_count}> {time} </div>
            {
                individualState.servicesWithTemplate.includes(refName)
                ?   <Link to={`${refName}`}> open </Link>
                :   null
            }
        </div>
    )
}
import styles from "./successfeedback.module.css";
import { ReactComponent as IconConfetti } from "../../../assets/icons/icon-confetti.svg";

export default function SuccessFeedback({ message, timeOutInSecs, close }:{message:string, timeOutInSecs:number, close:()=> void}) {
    
    setTimeout(()=> close(), timeOutInSecs * 1000);

    return (
        <div className={styles.success_feedback} onClick={close}>
            <IconConfetti className={styles.icon_ill} />
            <div>{message}</div>
        </div>
    );
}
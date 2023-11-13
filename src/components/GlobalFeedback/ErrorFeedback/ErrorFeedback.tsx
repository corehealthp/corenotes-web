import styles from "./errorfeedback.module.css";
import { ReactComponent as IconSadFace } from "../../../assets/icons/icon-sad.svg";

export default function ErrorFeedback({ message, timeOutInSecs, close }:{message:string, timeOutInSecs:number, close:()=> void}) {

    setTimeout(()=> close(), timeOutInSecs * 1000);

    return (
        <div className={styles.error_feedback} onClick={close}>
            <div className={styles.icon_sad_face}>
                <IconSadFace />
            </div>
            <div className={styles.message}>{message}</div>
        </div>
    );
}
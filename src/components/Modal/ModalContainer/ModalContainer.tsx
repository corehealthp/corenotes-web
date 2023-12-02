import styles from "./modalcontainer.module.css";

export default function ModalContainer({ children, contentContainerWidth }:{ children:JSX.Element, contentContainerWidth?:string }) {
    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_bg}></div>
            
            <div className={styles.content_container} style={{width:contentContainerWidth}}>
                { children }
            </div>
        </div>
    );
}
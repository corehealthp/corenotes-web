import styles from "./modalcontainer.module.css";

export default function ModalContainer({ children, close, contentContainerWidth }:{ children:JSX.Element, close:()=> void, contentContainerWidth?:string }) {
    return (
        <div className={styles.modal_container}>
            <div className={styles.modal_bg} 
            // onClick={()=> close()}
            ></div>
            
            <div className={styles.content_container} style={{width:contentContainerWidth}}>
                { children }
            </div>
        </div>
    );
}
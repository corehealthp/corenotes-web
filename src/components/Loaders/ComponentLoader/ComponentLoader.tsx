import styles from "./componentloader.module.css";

export default function ComponentLoader({size, innerSize}:{size?:string, innerSize?:string}) {
    return(
        <div className={styles.container} style={{width: size, height: size}}>
            <span className={styles.loader} style={{width: innerSize, height: innerSize}}></span>
        </div>
    )
}
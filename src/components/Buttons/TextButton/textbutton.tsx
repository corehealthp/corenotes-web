import CircularRingLoader from "src/components/Loaders/CircularRingLoader";
import styles from "./textbutton.module.css"
import { CSSProperties } from "react";

interface textButtonType {
    type?:"button"|"submit"|"reset",
    width?:string,
    height?:string,
    fontSize?:string,
    label:string,
    backgroundColor?:string,
    labelColor?:string,
    isLoading?:boolean,
    loaderColor?:string,
    disabled?:boolean,
    extraStyles?:string,
    onClick:()=> void,
    customStyles?: CSSProperties;
}

export default function TextButton({
    type,
    width,
    height,
    fontSize,
    label, 
    isLoading,
    backgroundColor,
    labelColor,
    loaderColor, 
    disabled,
    extraStyles,
    onClick,
    customStyles
}:textButtonType) {
    const dynamicStyle = {
        width: width ?? "100%", 
        fontSize: fontSize, 
        height:height ?? "50px",
        backgroundColor: backgroundColor,
        color: labelColor,        
        ...customStyles
    }
    return(
        <button
            type={type ?? "button"}
            className={`${styles.button} ${extraStyles}`}
            style={dynamicStyle}
            onClick={()=> (isLoading) ?null :onClick?.() }
            disabled={disabled}
        >
            {
                (isLoading)
                ?   <div className={styles.loader_wrapper}> 
                        <CircularRingLoader color={loaderColor || "white"} />
                    </div>
                :   label
            }
        </button>
    );
}
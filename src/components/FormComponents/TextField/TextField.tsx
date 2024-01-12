import { CSSProperties } from "react";
import FormInputError from "../FormInputError";
import FormLabel from "../FormLabel";
import styles from "./textfield.module.css";

export default function TextField({
    label, width, height, placeholder, value, error, onInput, extraStyles
}:{ 
    label?:string;
    width?:string; 
    height?:string;
    error?:string;
    placeholder?:string; 
    value?:string; 
    extraStyles?:CSSProperties;
    
    onInput: (textValue:string)=> void;
}) {
    const dynamicStyle = {
        width: width || '100%',
        height: height || '100%',
        resize: 'none' as 'none',             
    };

    return(
        <div style={extraStyles}>
            <FormLabel text={label!} />
            <textarea 
                className={styles.text_field}
                style={dynamicStyle}
                placeholder={placeholder}
                value={value}
                onChange={(e)=> onInput?.(e.target.value)}
            />
            <FormInputError message={error!} />
        </div>
    )
}